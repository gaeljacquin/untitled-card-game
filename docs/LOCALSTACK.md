# LocalStack Setup Guide

This guide covers setting up and using LocalStack for local AWS service emulation.

## Prerequisites

- LocalStack installed via Homebrew
- AWS CLI LocalStack wrapper (`awslocal`)
- Docker (required by LocalStack)

## Quick Start

### 1. Start LocalStack

```bash
pnpm localstack:start
```

Or manually:
```bash
localstack start -d
```

### 2. Initialize Resources

```bash
pnpm localstack:init
```

Or use the combined command:
```bash
pnpm localstack:setup
```

### 3. Configure API Environment

Copy the example environment file:
```bash
cp apps/api/.env.local.example apps/api/.env.local
```

The `.env.local` file should contain:
```bash
AWS_ENDPOINT=http://localhost:4566
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
```

### 4. Start Development

```bash
pnpm dev
```

## Available Commands

| Command | Description |
|---------|-------------|
| `pnpm localstack:start` | Start LocalStack in detached mode |
| `pnpm localstack:stop` | Stop LocalStack |
| `pnpm localstack:status` | Check LocalStack status |
| `pnpm localstack:init` | Initialize AWS resources |
| `pnpm localstack:setup` | Start and initialize in one command |

## Using LocalStack Services

### DynamoDB

```typescript
import { GameSessionService } from './services/game-session.service';

// Create a session
await GameSessionService.createSession({
  sessionId: 'session-123',
  playerId: 'player-456',
  mode: 'four',
  score: 1000,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

// Get a session
const session = await GameSessionService.getSession('session-123');
```

### S3

```typescript
import { s3Client } from './config/aws';
import { PutObjectCommand } from '@aws-sdk/client-s3';

await s3Client.send(
  new PutObjectCommand({
    Bucket: 'game-assets',
    Key: 'screenshot.png',
    Body: imageBuffer,
  })
);
```

## Useful Commands

### List DynamoDB Tables
```bash
awslocal dynamodb list-tables
```

### Scan DynamoDB Table
```bash
awslocal dynamodb scan --table-name game-sessions
```

### List S3 Buckets
```bash
awslocal s3 ls
```

### List Objects in Bucket
```bash
awslocal s3 ls s3://game-assets
```

## Web UI

LocalStack provides a web UI at: `http://localhost:4566/_localstack/health`

## Troubleshooting

### LocalStack Won't Start
```bash
# Check Docker is running
docker ps

# Check LocalStack logs
localstack logs
```

### Resources Not Found
```bash
# Re-initialize resources
pnpm localstack:init
```

### Clear All Data
```bash
# Stop LocalStack
pnpm localstack:stop

# Remove data directory
rm -rf localstack-data

# Restart and reinitialize
pnpm localstack:setup
```

## Production vs Local

The AWS configuration automatically detects whether to use LocalStack or real AWS based on the `AWS_ENDPOINT` environment variable:

- **Local**: Set `AWS_ENDPOINT=http://localhost:4566`
- **Production**: Omit `AWS_ENDPOINT` to use real AWS services

## Resources

- [LocalStack Documentation](https://docs.localstack.cloud/)
- [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/)
