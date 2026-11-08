/** Implement only against a contracted, approved provider. Do not put provider secrets in frontend code. */
export interface PaymentProvider {
  createDeposit(input: { customerRef: string; amountMinor: bigint; currency: string; idempotencyKey: string }): Promise<{ providerRef: string; redirectUrl?: string }>;
  createPayout(input: { customerRef: string; amountMinor: bigint; currency: string; beneficiaryToken: string; idempotencyKey: string }): Promise<{ providerRef: string; status: 'pending' | 'accepted' }>;
  verifyWebhook(rawBody: Buffer, signature: string | undefined, timestamp: string | undefined): Promise<{ eventId: string; eventType: string; providerRef: string }>;
}
export interface CustodyProvider {
  createDepositAddress(input: { customerRef: string; asset: string; network: string }): Promise<{ address: string; providerRef: string }>;
  requestWithdrawal(input: { customerRef: string; asset: string; network: string; amountAtomic: string; destination: string; idempotencyKey: string }): Promise<{ providerRef: string; status: 'pending' | 'held' }>;
}
export interface ExchangeProvider {
  quote(input: { baseAsset: string; quoteAsset: string; amount: string; side: 'buy' | 'sell' }): Promise<{ quoteId: string; rate: string; expiresAt: string }>;
  execute(input: { quoteId: string; idempotencyKey: string }): Promise<{ providerOrderId: string; status: 'pending' | 'filled' }>;
}
