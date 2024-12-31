FROM node:latest AS shared-build
WORKDIR /shared
COPY --from=root-folder /shared ./
RUN npm install -g pnpm && pnpm install
RUN pnpm build

FROM node:latest AS base
WORKDIR /app
COPY --from=root-folder pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY --from=shared-build /shared ./shared
COPY package.json pnpm-lock.yaml ./client/
RUN npm install -g pnpm && pnpm install

FROM base AS dev
COPY . ./client
WORKDIR /app/client
CMD ["pnpm", "dev-docker"]

FROM base AS build
WORKDIR /app
COPY . ./client
WORKDIR /app/client
RUN pnpm build

FROM node:current-alpine AS prod
WORKDIR /app
COPY --from=root-folder pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY --from=shared-build /shared ./shared
COPY package.json pnpm-lock.yaml ./client/
COPY --from=build /app/client/.next ./client/.next
COPY public ./client/public
RUN npm install -g pnpm && pnpm install --filter ./client --prod
WORKDIR /app/client
CMD ["pnpm", "start"]
