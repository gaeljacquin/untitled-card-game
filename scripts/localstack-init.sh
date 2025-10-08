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

# Create DynamoDB table for game sessions
echo "📦 Creating DynamoDB tables..."
awslocal dynamodb create-table \
  --table-name game-sessions \
  --attribute-definitions \
    AttributeName=sessionId,AttributeType=S \
  --key-schema \
    AttributeName=sessionId,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region us-east-1 || echo "Table may already exist"

# Create S3 bucket for game assets
echo "🪣 Creating S3 buckets..."
awslocal s3 mb s3://game-assets --region us-east-1 || echo "Bucket may already exist"

# EC2 Setup
echo "🖥️  Setting up EC2 instance..."

# Create key pair
echo "🔑 Creating EC2 key pair..."
mkdir -p .localstack
awslocal ec2 create-key-pair \
  --key-name ucg-api-key \
  --query 'KeyMaterial' \
  --output text > .localstack/ucg-api-key.pem 2>/dev/null || echo "Key pair may already exist"

if [ -f .localstack/ucg-api-key.pem ]; then
  chmod 400 .localstack/ucg-api-key.pem
  echo "✅ Key pair saved to .localstack/ucg-api-key.pem"
fi

# Create security group
echo "🔒 Creating security group..."
SG_ID=$(awslocal ec2 create-security-group \
  --group-name ucg-api-sg \
  --description "Security group for UCG API server" \
  --output text 2>/dev/null || awslocal ec2 describe-security-groups \
  --group-names ucg-api-sg \
  --query 'SecurityGroups[0].GroupId' \
  --output text)

echo "Security group ID: $SG_ID"

# Add security group rules
echo "🔓 Configuring security group rules..."
awslocal ec2 authorize-security-group-ingress \
  --group-id $SG_ID \
  --protocol tcp \
  --port 22 \
  --cidr 0.0.0.0/0 2>/dev/null || echo "SSH rule may already exist"

awslocal ec2 authorize-security-group-ingress \
  --group-id $SG_ID \
  --protocol tcp \
  --port 3000 \
  --cidr 0.0.0.0/0 2>/dev/null || echo "API port rule may already exist"

# Create user data script
cat > .localstack/user-data.sh << 'EOF'
#!/bin/bash
# User data script for UCG API EC2 instance

# Update system
yum update -y

# Install Node.js 20.x
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
yum install -y nodejs

# Install pnpm
npm install -g pnpm

# Create application directory
mkdir -p /opt/ucg-api
cd /opt/ucg-api

# Note: In a real scenario, you would clone the repo or copy files here
# For LocalStack, this is mostly for documentation/testing purposes
echo "UCG API environment ready"
EOF

chmod +x .localstack/user-data.sh

# Launch EC2 instance
echo "🚀 Launching EC2 instance..."

# Get available AMI ID from LocalStack
AMI_ID=$(awslocal ec2 describe-images --query 'Images[0].ImageId' --output text 2>/dev/null || echo "ami-ff0fea8310f3")
echo "Using AMI: $AMI_ID"

INSTANCE_ID=$(awslocal ec2 run-instances \
  --image-id $AMI_ID \
  --instance-type t2.micro \
  --key-name ucg-api-key \
  --security-group-ids $SG_ID \
  --user-data file://.localstack/user-data.sh \
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=ucg-api-server}]' \
  --query 'Instances[0].InstanceId' \
  --output text 2>&1)

if [ -n "$INSTANCE_ID" ] && [ "$INSTANCE_ID" != "None" ] && [[ ! "$INSTANCE_ID" =~ ^(An error|Could not) ]]; then
  echo "✅ EC2 instance launched: $INSTANCE_ID"

  # Get instance details
  echo "📋 Instance details:"
  awslocal ec2 describe-instances \
    --instance-ids $INSTANCE_ID \
    --query 'Reservations[0].Instances[0].[InstanceId,InstanceType,State.Name,PublicIpAddress]' \
    --output table
else
  echo "⚠️  EC2 instance launch failed or may already exist"
  if [[ "$INSTANCE_ID" =~ ^(An error|Could not) ]]; then
    echo "Error: $INSTANCE_ID"
  fi

  # List existing instances
  echo "📋 Checking for existing instances..."
  EXISTING_INSTANCES=$(awslocal ec2 describe-instances \
    --filters "Name=tag:Name,Values=ucg-api-server" \
    --query 'Reservations[*].Instances[*].[InstanceId,InstanceType,State.Name,PublicIpAddress]' \
    --output table 2>/dev/null)

  if [ -n "$EXISTING_INSTANCES" ]; then
    echo "$EXISTING_INSTANCES"
  else
    echo "No existing instances found."
  fi
fi

echo ""
echo "✅ LocalStack initialization complete!"
echo "📍 LocalStack endpoint: http://localhost:4566"
echo "🔑 SSH key: .localstack/ucg-api-key.pem"
echo ""
echo "To connect to EC2 instance:"
echo "  awslocal ec2 describe-instances --filters 'Name=tag:Name,Values=ucg-api-server'"
