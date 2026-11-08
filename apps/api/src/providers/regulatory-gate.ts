import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type FinancialProduct = 'fiat_payments' | 'crypto_custody' | 'crypto_exchange' | 'crypto_transfers';
@Injectable()
export class RegulatoryGate {
  constructor(private readonly config: ConfigService) {}
  assertEnabled(product: FinancialProduct, countryCode: string) {
    const enabled = this.config.get<string>('REGULATORY_LIVE_ENABLED') === 'true';
    const reference = this.config.get<string>('REGULATORY_APPROVAL_REFERENCE')?.trim();
    const products = (this.config.get<string>('REGULATORY_APPROVED_PRODUCTS') ?? '').split(',').map(x => x.trim());
    if (!enabled || !reference || !products.includes(`${countryCode}:${product}`)) {
      throw new ForbiddenException({ code: 'PRODUCT_NOT_AUTHORISED_FOR_LIVE_USE', message: 'This product is not enabled for live operation in this jurisdiction.' });
    }
  }
}
