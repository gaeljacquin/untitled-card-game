#!/bin/bash

# Deploy API to LocalStack EC2 instance
# Usage: ./scripts/ec2-deploy.sh

set -e

echo "🚀 Deploying UCG API to LocalStack EC2..."

# Get instance ID
INSTANCE_ID=$(awslocal ec2 describe-instances \
  --filters "Name=tag:Name,Values=ucg-api-server" "Name=instance-state-name,Values=running" \
  --query 'Reservations[0].Instances[0].InstanceId' \
  --output text)

if [ "$INSTANCE_ID" == "None" ] || [ -z "$INSTANCE_ID" ]; then
  echo "❌ No running EC2 instance found with tag Name=ucg-api-server"
  echo "Run 'pnpm localstack:init' to create the instance first"
  exit 1
fi

echo "📋 Instance ID: $INSTANCE_ID"

# Get instance IP
INSTANCE_IP=$(awslocal ec2 describe-instances \
  --instance-ids $INSTANCE_ID \
  --query 'Reservations[0].Instances[0].PublicIpAddress' \
  --output text)

echo "🌐 Instance IP: $INSTANCE_IP"

# Check if key file exists
KEY_FILE=".localstack/ucg-api-key.pem"
if [ ! -f "$KEY_FILE" ]; then
  echo "❌ SSH key not found at $KEY_FILE"
  exit 1
fi

# Build the API
echo "📦 Building API..."
cd apps/api
pnpm build
cd ../..

# Create deployment package
echo "📦 Creating deployment package..."
mkdir -p .localstack/deploy
rm -rf .localstack/deploy/*
cp -r apps/api/dist .localstack/deploy/
cp apps/api/package.json .localstack/deploy/
cp -r libs/shared .localstack/deploy/

# Create tar archive
cd .localstack/deploy
tar -czf ../api-deploy.tar.gz .
cd ../..

echo "✅ Deployment package created: .localstack/api-deploy.tar.gz"

# Note: LocalStack EC2 doesn't support actual SSH connections
# This is for documentation/testing purposes
echo ""
echo "⚠️  Note: LocalStack EC2 is a mock service and doesn't support actual SSH connections"
echo "In a real AWS environment, you would deploy using:"
echo ""
echo "  # Copy deployment package"
echo "  scp -i $KEY_FILE .localstack/api-deploy.tar.gz ec2-user@$INSTANCE_IP:/tmp/"
echo ""
echo "  # Connect and deploy"
echo "  ssh -i $KEY_FILE ec2-user@$INSTANCE_IP"
echo "  cd /opt/ucg-api"
echo "  tar -xzf /tmp/api-deploy.tar.gz"
echo "  pnpm install --prod"
echo "  pm2 start dist/index.js --name ucg-api"
echo ""
echo "For testing with LocalStack, continue running the API locally:"
echo "  cd apps/api && pnpm dev"
