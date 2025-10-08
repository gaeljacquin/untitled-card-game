import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { S3Client } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load environment files (must happen before client creation)
const currentEnv = (process.env.APP_ENV || process.env.NODE_ENV || 'development').toLowerCase();
const envPaths = [
  `.env.${currentEnv}.local`,
  `.env.local`,
  `.env.${currentEnv}`,
  `.env`,
].map((f) => path.resolve(process.cwd(), f));

for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath, override: true });
  }
}

const isLocal = process.env.AWS_ENDPOINT !== undefined;

const dynamoDbClient = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  ...(isLocal && {
    endpoint: process.env.AWS_ENDPOINT,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test',
    },
  }),
});

export const docClient = DynamoDBDocumentClient.from(dynamoDbClient);

export const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  forcePathStyle: true, // Required for LocalStack
  ...(isLocal && {
    endpoint: process.env.AWS_ENDPOINT,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test',
    },
  }),
});

console.log(`AWS clients initialized (${isLocal ? 'LocalStack' : 'AWS'})`);
