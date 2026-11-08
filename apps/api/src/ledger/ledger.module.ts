import { Module } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { LedgerService } from './ledger.service';
@Module({ providers: [PrismaService, LedgerService], exports: [LedgerService] })
export class LedgerModule {}
