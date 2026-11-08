# Production deployment checklist

- [ ] Confirm CAC legal entity name, directors, UBOs and registered office.
- [ ] Obtain Nigerian legal advice mapping each proposed service to SEC/CBN and other applicable permissions.
- [ ] Verify SEC registration/approval scope for each virtual asset activity and CBN/payment permissions or licensed partner model.
- [ ] Execute banking, payment, KYC, sanctions, transaction-monitoring, custody/MPC and liquidity provider agreements.
- [ ] Complete country-by-country legal/product permission matrix; deny by default.
- [ ] Configure AWS account, private VPC, managed PostgreSQL, Redis, KMS/HSM, secrets manager, WAF, backups and centralized logs.
- [ ] Complete threat model, secure code review, penetration test, custody review and ledger reconciliation test.
- [ ] Approve AML/CFT/CPF policies, MLRO ownership, suspicious activity workflows, Travel Rule applicability, privacy notices and retention schedule.
- [ ] Verify webhook signature/replay handling and provider reconciliation in staging.
- [ ] Run disaster recovery, incident response and withdrawal kill-switch exercises.
- [ ] Obtain board, compliance, legal and security sign-off before enabling any live product.
