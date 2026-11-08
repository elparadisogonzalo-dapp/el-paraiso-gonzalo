# El Paraíso Gonzalo — financial platform foundation

Monorepo foundation for a Nigeria-incorporated, globally-oriented financial platform: fiat accounts and payments, crypto wallets, custody, and exchange. It is deliberately **not enabled for live financial activity by default**.

## What is included
- Next.js customer frontend (login shell and dashboard).
- NestJS API with health, auth scaffolding, regulatory release gate, and provider adapter interfaces.
- PostgreSQL/Prisma schema for users, KYC, wallets, fiat/crypto accounts, immutable double-entry ledger, payment/exchange orders, compliance cases, audit events, and idempotency.
- OpenAPI contract, Dockerfiles, local Postgres/Redis compose stack, and GitHub Actions CI.
- Fail-closed provider configuration. No fake live provider credentials or unreviewed custody implementation.

## Requirements
Node.js 22+, pnpm 10+, Docker Compose.

## Local start
1. `cp .env.example .env` and replace the local JWT secrets.
2. `docker compose up -d postgres redis`
3. `pnpm install`
4. `pnpm --filter @epg/api prisma:generate`
5. `pnpm --filter @epg/api prisma:migrate`
6. `pnpm dev`

Web: http://localhost:3000 — API: http://localhost:4000 — health: http://localhost:4000/health.

## Live release gate
Live transfers, deposits, withdrawals, custody, and exchange must remain disabled until the company has the specific approvals/permissions required for each product and jurisdiction, approved banking/payment/custody/liquidity partners, signed provider contracts, production credentials, operational controls, and independent security/compliance sign-off. Set `REGULATORY_LIVE_ENABLED=true` only through a controlled deployment after legal/compliance approval; also set a non-empty approval reference and explicit approved product list. The gate is necessary but does not itself establish legal authorisation.

The platform must be configured per country and per product. Do not infer global permission from Nigerian incorporation or one Nigerian approval.

## Provider integrations
Implement the interfaces in `apps/api/src/providers` for the selected contracted providers. Verify provider signatures against the raw request body, enforce timestamp/replay windows, persist webhook event IDs uniquely, and reconcile provider reports against the internal ledger. Never trust browser transaction status.

## Security requirements before production
- Replace the scaffold auth with a reviewed OIDC/identity provider, MFA/passkeys, session rotation, rate limits, account recovery and device/risk controls.
- Store secrets in AWS Secrets Manager/KMS (or equivalent); use HSM/MPC provider for custodial keys. Never collect seed phrases or private keys on the server.
- Complete threat modelling, independent penetration test, dependency/container scanning, privacy impact assessment, AML/KYC/sanctions/transaction-monitoring procedures, incident response and disaster-recovery tests.
- Add country/product permission checks at every transaction entry point and re-check at execution time.
- Ledger posting must be atomic, balanced, immutable and idempotent; corrections use compensating entries.
- Configure backups, point-in-time recovery, encryption, alerting, audit retention and reconciliation operations.

## Important
This is an executable engineering foundation, not a legal opinion, banking licence, custody system, audited exchange, or production certification. The company legal name, CAC details, exact SEC/CBN permissions, approved markets, and chosen providers were not supplied, so those are intentionally configuration/implementation decisions rather than invented values.

## Current implementation status
The ledger posting primitive is implemented as an internal Nest service: it enforces at least two non-zero lines, balances each currency independently, checks account/asset consistency, uses a serializable database transaction, and supports an idempotency key. It is not exposed as a public endpoint. Authentication, KYC, payments, custody, and exchange are intentionally integration stubs/ports until the exact providers and contractual/regulatory scope are supplied.


## Brand assets

The supplied El Paraíso Gonzalo logo is installed at `apps/web/public/brand/el-paraiso-gonzalo-logo.png`, used in the shared site header on the home, login and dashboard pages, and copied to `apps/web/app/icon.png` for the browser favicon/app icon. Replace these files to update the brand artwork.
# el-paraiso-gonzalo
