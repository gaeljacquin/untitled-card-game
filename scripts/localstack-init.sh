#!/bin/bash

# Initialize LocalStack resources for Untitled Card Game
# Usage: ./scripts/localstack-init.sh

set -e

echo "🚀 Initializing LocalStack resources..."

# Wait for LocalStack to be ready
echo "⏳ Waiting for LocalStack to be ready..."
while ! curl -s http://localhost:4566/_localstack/health | grep -q '"dynamodb": "running"'; do
  sleep 1
done

echo "✅ LocalStack is ready!"

# Example: Create DynamoDB table for game sessions
echo "📦 Creating DynamoDB tables..."
awslocal dynamodb create-table \
  --table-name game-sessions \
  --attribute-definitions \
    AttributeName=sessionId,AttributeType=S \
  --key-schema \
    AttributeName=sessionId,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region us-east-1 || echo "Table may already exist"

# Example: Create S3 bucket for game assets
echo "🪣 Creating S3 buckets..."
awslocal s3 mb s3://game-assets --region us-east-1 || echo "Bucket may already exist"

echo "✅ LocalStack initialization complete!"
echo "📍 LocalStack endpoint: http://localhost:4566"
