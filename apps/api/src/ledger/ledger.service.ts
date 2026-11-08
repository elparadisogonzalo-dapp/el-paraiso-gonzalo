import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';

type PostingLine = { accountId: string; amountMinor: bigint; currency: string };
type PostLedgerInput = { reference: string; idempotencyKey: string; description: string; sourceSystem: string; lines: PostingLine[] };

/** Internal-only posting primitive. Positive = debit, negative = credit. Never expose directly to customers. */
@Injectable()
export class LedgerService {
  constructor(private readonly prisma: PrismaService) {}

  async post(input: PostLedgerInput) {
    if (input.lines.length < 2 || input.lines.some(x => x.amountMinor === 0n)) {
      throw new BadRequestException('A ledger posting requires at least two non-zero lines.');
    }
    const totals = new Map<string, bigint>();
    for (const line of input.lines) totals.set(line.currency, (totals.get(line.currency) ?? 0n) + line.amountMinor);
    if ([...totals.values()].some(total => total !== 0n)) {
      throw new BadRequestException('Ledger posting is not balanced for every currency.');
    }
    try {
      return await this.prisma.$transaction(async tx => {
        const existing = await tx.ledgerTransaction.findUnique({ where: { idempotencyKey: input.idempotencyKey }, include: { entries: true } });
        if (existing) return existing;
        const accountIds = [...new Set(input.lines.map(x => x.accountId))];
        const accounts = await tx.account.findMany({ where: { id: { in: accountIds } }, select: { id: true, asset: { select: { code: true } } } });
        if (accounts.length !== accountIds.length) throw new BadRequestException('Unknown ledger account.');
        const currencyByAccount = new Map(accounts.map(a => [a.id, a.asset.code]));
        for (const line of input.lines) if (currencyByAccount.get(line.accountId) !== line.currency) throw new BadRequestException('Ledger line currency does not match account asset.');
        return tx.ledgerTransaction.create({
          data: {
            reference: input.reference,
            idempotencyKey: input.idempotencyKey,
            description: input.description,
            sourceSystem: input.sourceSystem,
            status: 'POSTED',
            postedAt: new Date(),
            entries: { create: input.lines.map(line => ({ accountId: line.accountId, amountMinor: line.amountMinor, currency: line.currency })) },
          }, include: { entries: true },
        });
      }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        const prior = await this.prisma.ledgerTransaction.findUnique({ where: { idempotencyKey: input.idempotencyKey }, include: { entries: true } });
        if (prior) return prior;
        throw new ConflictException('Duplicate ledger reference.');
      }
      throw error;
    }
  }
}
