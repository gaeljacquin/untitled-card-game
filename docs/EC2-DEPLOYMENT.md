# EC2 Deployment Guide

This guide covers setting up an EC2 instance for deploying the UCG API server.

## Prerequisites

- AWS Account
- GitHub repository with Actions enabled
- SSH key pair (.pem file) for EC2 access

## Step 1: Create EC2 Instance

### Launch EC2 Instance

1. **Go to AWS Console** → EC2 → Launch Instance

2. **Configure Instance:**
   - **Name:** `ucg-api-production`
   - **AMI:** Amazon Linux 2023 (or Ubuntu 22.04 LTS)
   - **Instance Type:** t3.micro (for testing) or t3.small (for production)
   - **Key Pair:** Create new or use existing (download .pem file)
   - **Network Settings:**
     - Allow SSH (port 22) from your IP
     - Allow Custom TCP (port 3000) from anywhere (0.0.0.0/0)
     - Or use ALB/API Gateway in front
   - **Storage:** 20GB gp3

3. **Launch** the instance

### Connect to Instance

```bash
# Download your key pair (e.g., ucg-api-key.pem)
chmod 400 ucg-api-key.pem

# Connect via SSH
ssh -i ucg-api-key.pem ec2-user@<EC2_PUBLIC_IP>
```

## Step 2: Setup EC2 Instance

### Install Required Software

```bash
# Update system
sudo yum update -y  # For Amazon Linux
# OR
sudo apt update && sudo apt upgrade -y  # For Ubuntu

# Install Node.js 20.x
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs  # Amazon Linux
# OR
sudo apt install -y nodejs  # Ubuntu

# Install pnpm
sudo npm install -g pnpm@10.16.1

# Install AWS CLI (if not already installed)
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```

### Setup Application Directory

```bash
# Create application directory
sudo mkdir -p /opt/ucg-api/{releases,current}
sudo chown -R ec2-user:ec2-user /opt/ucg-api
```

### Configure AWS Credentials on EC2 (Optional)

**Only needed if your API uses AWS services (DynamoDB, S3, etc.)**

**Option A: Use IAM Role (Recommended)**
1. Create IAM role with necessary permissions (e.g., DynamoDB, S3)
2. Attach role to EC2 instance via AWS Console
3. No credentials needed in code

**Option B: Configure credentials manually (less secure)**
```bash
aws configure
# Enter your AWS credentials
```

### Setup Systemd Service

```bash
# Create service file
sudo nano /etc/systemd/system/ucg-api.service
```

Add the following content:

```ini
[Unit]
Description=UCG API Server
After=network.target

[Service]
Type=simple
User=ec2-user
WorkingDirectory=/opt/ucg-api/current/dist
Environment=NODE_ENV=production
Environment=PORT=3000
EnvironmentFile=/opt/ucg-api/.env
ExecStart=/usr/bin/node /opt/ucg-api/current/dist/index.js
Restart=always
RestartSec=10
StandardOutput=append:/var/log/ucg-api/output.log
StandardError=append:/var/log/ucg-api/error.log

[Install]
WantedBy=multi-user.target
```

```bash
# Create log directory
sudo mkdir -p /var/log/ucg-api
sudo chown ec2-user:ec2-user /var/log/ucg-api

# Create environment file
sudo nano /opt/ucg-api/.env
```

Add your environment variables:

```bash
PORT=3000
NODE_ENV=production
AWS_REGION=us-east-1
CLIENT_URLS=https://your-frontend-domain.com
# Add other required env vars
```

```bash
# Set permissions
sudo chmod 600 /opt/ucg-api/.env

# Reload systemd and enable service
sudo systemctl daemon-reload
sudo systemctl enable ucg-api
```

## Step 3: Configure GitHub Secrets

Go to **GitHub Repository → Settings → Secrets and variables → Actions**

Add the following secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `EC2_HOST` | Your domain or EC2 IP | e.g., `ucg-api.example.com` |
| `EC2_USER` | `ec2-user` (Amazon Linux) or `ubuntu` (Ubuntu) | SSH user |
| `EC2_SSH_KEY` | Contents of .pem file | Private key for SSH |

### How to add EC2_SSH_KEY:

```bash
# Copy the entire contents of your .pem file
cat ucg-api-key.pem

# Paste into GitHub Secret (include BEGIN/END lines)
```

## Step 4: Setup Domain (Optional)

### Using Route 53

1. **Create hosted zone** for your domain
2. **Create A record** pointing to EC2 Elastic IP
3. **Update CLIENT_URLS** in `/opt/ucg-api/.env`

### Using Elastic IP

```bash
# Allocate Elastic IP
aws ec2 allocate-address --domain vpc

# Associate with instance
aws ec2 associate-address \
  --instance-id <INSTANCE_ID> \
  --allocation-id <ALLOCATION_ID>
```

## Step 5: Setup SSL/TLS (Recommended)

### Option A: Use Application Load Balancer

1. Create ALB in AWS Console
2. Add SSL certificate from ACM
3. Forward traffic to EC2 on port 3000
4. Update security group to only allow ALB traffic

### Option B: Use Nginx + Let's Encrypt

```bash
# Install Nginx
sudo yum install nginx -y  # Amazon Linux
# OR
sudo apt install nginx -y  # Ubuntu

# Install Certbot
sudo yum install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d api.yourdomain.com

# Configure Nginx as reverse proxy
sudo nano /etc/nginx/conf.d/ucg-api.conf
```

Add:

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Restart Nginx
sudo systemctl restart nginx
sudo systemctl enable nginx
```

## Step 6: Test Deployment

### Manual Test Deploy (Optional)

```bash
# On your local machine
cd apps/api
pnpm build

# Create test package
mkdir -p deploy
cp -r dist deploy/
cp package.json deploy/
cp -r ../../libs/shared deploy/
cd deploy
tar -czf ../test-deploy.tar.gz .

# Copy to EC2
scp -i ucg-api-key.pem test-deploy.tar.gz ec2-user@<EC2_HOST>:/tmp/

# SSH to EC2 and deploy
ssh -i ucg-api-key.pem ec2-user@<EC2_HOST>
cd /opt/ucg-api
mkdir -p releases/test
tar -xzf /tmp/test-deploy.tar.gz -C releases/test
cd releases/test
pnpm install --prod --frozen-lockfile
ln -sfn /opt/ucg-api/releases/test /opt/ucg-api/current
sudo systemctl restart ucg-api
sudo systemctl status ucg-api
```

### Trigger GitHub Action

**For testing:**
```bash
# Push changes to build/various-changes branch
git checkout build/various-changes
git add .
git commit -m "feat: test deployment"
git push origin build/various-changes
```

**For production:**
```bash
# Update workflow to trigger on main branch
# Edit .github/workflows/deploy-api.yml and change:
#   branches: - main

# Then push to main
git checkout main
git merge build/various-changes
git push origin main
```

Watch GitHub Actions tab for deployment progress!

## Monitoring & Maintenance

### View Logs

```bash
# Service logs
sudo journalctl -u ucg-api -f

# Application logs
tail -f /var/log/ucg-api/output.log
tail -f /var/log/ucg-api/error.log
```

### Rollback to Previous Release

```bash
# List releases
ls -la /opt/ucg-api/releases/

# Rollback to previous release
sudo ln -sfn /opt/ucg-api/releases/<previous-sha> /opt/ucg-api/current
sudo systemctl restart ucg-api
```

### Health Checks

```bash
# Check service status
sudo systemctl status ucg-api

# Test API endpoint
curl http://localhost:3000/
```

## Deployment Architecture

The GitHub Actions workflow:
1. Builds the API in GitHub's infrastructure
2. Creates a deployment package (tarball)
3. Copies package to EC2 via SCP
4. Extracts to `/opt/ucg-api/releases/<commit-sha>`
5. Installs dependencies with pnpm
6. Updates symlink to new release
7. Restarts systemd service
8. Keeps last 5 releases for rollback

**No S3 required** - Direct SSH deployment via SCP.

## Security Best Practices

1. **Use IAM roles** instead of AWS credentials on EC2 (if using AWS services)
2. **Restrict security groups** to only necessary ports
3. **Restrict SSH access** to specific IPs (not 0.0.0.0/0)
4. **Setup SSL/TLS** with Let's Encrypt or ALB
5. **Enable CloudWatch** for monitoring
6. **Setup automated backups** with AWS Backup
7. **Use secrets manager** for sensitive environment variables
8. **Keep system updated**: `sudo yum update -y`
9. **Setup CloudWatch alarms** for CPU/Memory/Disk
10. **Enable VPC Flow Logs** for network monitoring
11. **Rotate SSH keys** regularly

## Troubleshooting

### Service won't start

```bash
sudo journalctl -u ucg-api -n 50
# Check for missing dependencies or env vars
```

### Permission denied errors

```bash
sudo chown -R ec2-user:ec2-user /opt/ucg-api
sudo chmod +x /opt/ucg-api/current/dist/index.js
```

### Port 3000 not accessible

```bash
# Check security group allows inbound traffic
# Check if service is listening
sudo netstat -tulpn | grep 3000
```

## Cost Optimization

- Use **t3.micro** for low traffic ($~7/month)
- Setup **auto-scaling** for variable traffic
- Use **Spot Instances** for development
- Enable **EBS optimization** for better I/O
- Use **CloudWatch** to monitor and optimize

## Resources

- [AWS EC2 Documentation](https://docs.aws.amazon.com/ec2/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Node.js Production Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
