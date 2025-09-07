# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Monorepo-style layout with two independent Node.js apps:
  - client: Next.js 15 + React 19 UI, Tailwind, shadcn, socket.io-client
  - server: NestJS 11 + socket.io WebSocket gateway for game state
- Local development is container-friendly via docker-compose; direct pnpm workflows are also available per app directory.

Prerequisites
- Docker + docker-compose for the shell scripts here (setup/start/stop/cleanup)
- Node.js with Corepack enabled (pnpm) if running apps outside Docker
- On Windows, you may need Set-ExecutionPolicy RemoteSigned to run the PowerShell scripts

Quick start (containers)
- Initial setup (copies .env files and starts both apps):
  - Windows: ./setup.ps1
  - macOS/Linux/WSL: ./setup.sh
- Start both apps (if already set up):
  - Windows: ./start.ps1
  - macOS/Linux/WSL: ./start.sh
- Stop both apps:
  - Windows: ./stop.ps1
  - macOS/Linux/WSL: ./stop.sh
- Cleanup local Docker images/containers:
  - Windows: ./cleanup.ps1
  - macOS/Linux/WSL: ./cleanup.sh

Environment and ports
- client/.env.example
  - PORT=3000
  - SERVER_URL=http://localhost:8080
  - BUILD_TARGET=dev
  - MAINTENANCE_MODE=1
- server/.env.example
  - PORT=8080
  - CLIENT_URL=http://localhost:3000
  - BUILD_TARGET=dev
- When running via docker-compose:
  - Client binds ${PORT:-3000}
  - Server binds host ${PORT:-8080} to container 3000; the server listens on process.env.PORT || 3000 in code, but the compose file maps host 8080 to container 3000 by default

Client (Next.js)
- Path: client/
- Package manager: pnpm (Corepack recommended)
- Scripts
  - pnpm dev            # Next dev with Turbopack (reads .env)
  - pnpm build          # Next build
  - pnpm start          # Next start
  - pnpm typecheck      # tsc --noEmit
  - pnpm lint           # Next lint + Stylelint for CSS
  - pnpm lint-fix       # Same with --fix for Stylelint
  - pnpm prettier:check # Prettier check
  - pnpm prettier:write # Prettier write
  - pnpm test           # Runs prettier:check, lint, typecheck, then attempts “pnpm run jest”
    Note: There is no explicit “jest” script defined. To run tests directly, invoke Jest via npx or pnpm dlx (see below).
- Useful commands
  - Install deps: pnpm install
  - Run dev server: pnpm dev
  - Run a single Jest test (direct): npx jest path/to/file.spec.ts -t "test name pattern"
  - Run tests watch mode (direct): npx jest --watch
- Lint/format standards
  - ESLint flat config (eslint.config.mjs) with next/core-web-vitals and @typescript-eslint
  - Simple import sort plugin enforced
  - Prettier integrated via plugin:prettier/recommended
  - Stylelint checks for *.css
- Config highlights
  - next.config.ts sets public env: serverUrl, port, maintenanceMode, etc. Ensure SERVER_URL is set in client/.env
  - tsconfig.json uses baseUrl . and paths @/* -> ./*; module set to commonJS; strict true

Server (NestJS)
- Path: server/
- Package manager: pnpm
- Scripts
  - pnpm build            # nest build (uses tsconfig.build.json)
  - pnpm start            # nest start
  - pnpm start:dev        # nest start --watch
  - pnpm start:debug      # nest start --debug --watch
  - pnpm start:prod       # node dist/main
  - pnpm lint             # eslint with --fix
  - pnpm prettier:check   # Prettier check
  - pnpm prettier:write   # Prettier write
  - pnpm test             # jest
  - pnpm test:watch       # jest --watch
  - pnpm test:cov         # jest --coverage
  - pnpm test:debug       # node --inspect-brk ... jest --runInBand
  - pnpm test:e2e         # jest --config ./test/jest-e2e.json
- Useful commands
  - Install deps: pnpm install
  - Run dev server (watch): pnpm start:dev
  - Run a single Jest test file: pnpm test -- src/game/game.gateway.spec.ts
  - Run a single test by name: pnpm test -- -t "should be defined"
- Config highlights
  - src/main.ts sets up ValidationPipe and CORS
    - CORS origin uses process.env.CLIENT_URL; methods GET,POST; credentials false
  - tsconfig path alias @/* -> ./src/*
  - .eslintrc.js enables @typescript-eslint and Prettier
  - Jest in package.json: testRegex ".*\.spec\.ts$", rootDir src, ts-jest transform

High-level architecture
- Frontend (client):
  - Next.js app talks to the backend via socket.io-client, using SERVER_URL from client/.env and surfaced through next.config.ts env
  - UI stack includes Tailwind v4, shadcn/ui, Magic UI, dnd-kit for drag-and-drop
- Backend (server):
  - NestJS application exposes a Socket.IO gateway
  - GameGateway maintains per-connection game state in a Map<string, ABGame>
    - afterInit: logs server init
    - handleConnection/handleDisconnect: logs and manages client lifecycle
    - hello-ws: simple ping/echo style message
    - game-init: payload carries modeSlug; server resolves ABMode, creates ABDeck seed, initializes ABGame, deals first hand, persists ABGame in the map, emits initial data
    - game-next-round: accepts client grid and discard; updates ABGame; computes gameOver when discards == gridSize; either emits next hand or gameOver
  - ABGame, ABDeck, ABMode are provided by @gaeljacquin/ucg-shared; server is authoritative for seed and turn progression
  - CORS is restricted to CLIENT_URL; ensure .env aligns with client port
- Networking and containers
  - docker-compose files per app; both join ucg_network bridge
  - client/docker-compose.yml exposes ${PORT:-3000}; forwards SERVER_URL env
  - server/docker-compose.yml exposes host ${PORT:-8080} to container 3000; forwards CLIENT_URL env

CI/CD
- .github/workflows/build-push-server-ecr.yml
  - On PR opened to main, for paths under server/ and shared/
  - Builds server Docker image for linux/amd64 and pushes to Amazon ECR using OIDC auth
  - Working directory set to ./server

Common development flows
- Local (no Docker)
  - Client: pushd client; pnpm install; pnpm dev; open http://localhost:3000; popd
  - Server: pushd server; pnpm install; pnpm start:dev; server listens on PORT from .env (default 8080 via compose) but code listens on 3000 if PORT not set; ensure CLIENT_URL in .env matches client URL; popd
- Local (Docker)
  - Use setup/start scripts as listed above; ensure a docker network named ucg_network exists or is created by docker-compose

Troubleshooting notes
- If client cannot reach server:
  - Verify client .env SERVER_URL matches server’s externally reachable URL and port
  - Ensure server CORS CLIENT_URL matches the actual client origin (including protocol and port)
- If Jest single-test runs are needed in client:
  - Use npx jest path/to/test -t "pattern" since there’s no jest script alias in client/package.json

Repository conventions and rules
- No special AI rules (Claude/Cursor/Copilot) found in this repo at the time of writing
- Follow ESLint/Prettier configs present in each app when editing code

Socket.IO event flows
- Connection
  - Namespace: default '/'
  - CORS: server only accepts origin matching CLIENT_URL from server/.env
  - On connection, server logs client.id; on disconnect, server deletes per-client game state from its internal Map

- hello-ws
  - Client -> Server: 'hello-ws' with payload like { name: string }
  - Server -> Client: 'hello-ws-res' with { message: string }
  - Purpose: connectivity sanity check

- game-init
  - Client -> Server: 'game-init' with { modeSlug: string }
  - Server:
    - Resolves mode via ABMode.getMode(modeSlug)
    - Creates new ABDeck and generates a seed deck.generateSeed(mode.gridSize)
    - Creates ABGame(mode), sets seed, deals first hand abGame.dealHand(0)
    - Stores ABGame in a Map keyed by client.id
  - Server -> Client: 'game-init-res' with { abCards }
    - abCards are produced by ABGame.dealHand(0) for the initial round

- game-next-round
  - Client -> Server: 'game-next-round' with { abDiscard, newGrid }
    - abDiscard: discard data for the round (pushed to abGame.abDiscards)
    - newGrid: the updated grid layout for the board
  - Server:
    - Updates the existing ABGame from the Map for client.id
    - Sets abGame.grid = newGrid; pushes abDiscard
    - Computes gridSize = abGame.mode.gridSize
    - gameOver = abGame.abDiscards.length === gridSize
    - If gameOver: prepares { gameOver: true }
    - Else: deals next hand with abGame.dealHand(currentRoundIndex) and prepares { abCards }
  - Server -> Client: 'game-next-round-res' with either { gameOver: true } or { abCards }

- Per-connection state
  - Server keeps a Map<string, ABGame> where the key is the socket.id
  - On disconnect, the entry is removed; the client should re-send 'game-init' on reconnect

Client usage example (browser/Next.js)
- The client uses socket.io-client and should connect to the URL from SERVER_URL in client/.env, which is surfaced to the app via next.config.ts env.serverUrl
- Minimal example:

```ts path=null start=null
import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_SERVER_URL || process.env.serverUrl || 'http://localhost:8080');

// hello-ws
socket.emit('hello-ws', { name: 'Player1' });
socket.on('hello-ws-res', (data) => {
  console.log('hello-ws-res:', data);
});

// game-init
socket.emit('game-init', { modeSlug: 'classic' });
socket.on('game-init-res', ({ abCards }) => {
  // render initial hand
});

// next round
function submitRound({ abDiscard, newGrid }) {
  socket.emit('game-next-round', { abDiscard, newGrid });
}

socket.on('game-next-round-res', (res) => {
  if (res.gameOver) {
    // handle end of game
  } else if (res.abCards) {
    // render next hand
  }
});
```

Notes
- Ensure the client origin (http://localhost:3000 by default) matches server/.env CLIENT_URL; otherwise CORS will block the WebSocket upgrade
- Ensure SERVER_URL in client/.env points to the externally reachable server URL/port (http://localhost:8080 by default when using the provided compose files)

