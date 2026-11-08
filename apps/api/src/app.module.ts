import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { HealthController } from './health/health.controller';
import { RegulatoryGate } from './providers/regulatory-gate';
import { AuthController } from './auth/auth.controller';
import { LedgerModule } from './ledger/ledger.module';

@Module({
  imports: [LedgerModule, ConfigModule.forRoot({ isGlobal: true, validationSchema: Joi.object({ NODE_ENV: Joi.string().valid('development','test','production').default('development'), DATABASE_URL: Joi.string().required(), JWT_ACCESS_SECRET: Joi.string().min(32).required(), JWT_REFRESH_SECRET: Joi.string().min(32).required(), REGULATORY_LIVE_ENABLED: Joi.boolean().default(false), REGULATORY_APPROVAL_REFERENCE: Joi.string().allow('').default(''), REGULATORY_APPROVED_PRODUCTS: Joi.string().allow('').default('') }) })],
  controllers: [HealthController, AuthController],
  providers: [RegulatoryGate],
})
export class AppModule {}
