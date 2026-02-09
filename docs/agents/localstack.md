# LocalStack

Commands:
- `bun localstack:start`
- `bun localstack:stop`
- `bun localstack:status`
- `bun localstack:init`
- `bun localstack:setup`

Integration test:
- `cd apps/api && bun test-localstack.ts`

Resources created by `scripts/localstack-init.sh`:
- EC2 instance: `ucg-api-server`
- Security group: `ucg-api-sg`
- Key pair: `ucg-api-key` stored in `.localstack/ucg-api-key.pem`
- DynamoDB table: `game-sessions`
- S3 bucket: `game-assets`
