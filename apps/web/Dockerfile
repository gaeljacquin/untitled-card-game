# Development stage
FROM node:latest AS dev
RUN npm uninstall --global pnpm
RUN npm install --global corepack
RUN corepack enable pnpm
WORKDIR /app
ENV PNPM_STORE_PATH=/app/.pnpm-store/v10
COPY package.json pnpm-lock.yaml* ./
RUN pnpm config set store-dir $PNPM_STORE_PATH --global
RUN pnpm install
COPY . ./
CMD ["pnpm", "dev"]

# Production stage
FROM node:current-alpine AS prod
RUN npm uninstall --global pnpm
RUN npm install --global corepack
RUN corepack enable pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install
COPY . ./
RUN pnpm build
CMD ["pnpm", "start"]
