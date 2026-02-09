# Environment Variables

Local API configuration (`.env.local`):
```bash
AWS_ENDPOINT=http://localhost:4566
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test

PORT=3000
CLIENT_URLS=http://localhost:5173
```

Notes:
- Setting `AWS_ENDPOINT` enables LocalStack mode.
- Omit `AWS_ENDPOINT` in production to use real AWS services.
