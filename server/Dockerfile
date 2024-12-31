FROM node:latest AS shared-build
WORKDIR /shared
COPY --from=root-folder /shared ./
RUN npm install -g pnpm && pnpm install
RUN pnpm build

FROM node:latest AS base
WORKDIR /app
COPY --from=root-folder pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY --from=shared-build /shared ./shared
COPY package.json ./server/
RUN npm install -g pnpm && pnpm install

FROM base AS dev
COPY . ./server
WORKDIR /app/server
CMD ["pnpm", "start:dev"]

FROM base AS build
WORKDIR /app
COPY . ./server
WORKDIR /app/server
RUN pnpm build

FROM node:current-alpine AS prod
WORKDIR /app
COPY --from=root-folder pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY --from=shared-build /shared ./shared
COPY package.json ./server/
COPY --from=build /app/server/dist ./server/dist
RUN npm install -g pnpm && pnpm install --filter ./server --prod
WORKDIR /app/server
CMD ["pnpm", "start:prod"]
