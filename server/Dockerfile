# Development stage
FROM node:latest AS dev
RUN npm uninstall --global pnpm
RUN npm install --global corepack
RUN corepack enable pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install
COPY . ./
CMD ["pnpm", "start:dev"]

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
CMD ["pnpm", "start:prod"]
