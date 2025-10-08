# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Untitled Card Game (UCG) is a card-based puzzle game where players arrange cards in a grid to create high-scoring poker hands. Built as an Nx monorepo with TypeScript, featuring a React/Vite frontend, Elysia backend with Socket.IO for real-time game state, and shared game logic.

## Repository Structure

```
apps/
  api/          - Elysia backend server with Socket.IO
    src/
      config/
        aws.ts              - AWS SDK client configuration
      services/
        game-session.service.ts - DynamoDB operations
    test-localstack.ts      - LocalStack integration test
  web/          - React frontend (Vite + React Router)
libs/
  shared/       - Shared game logic, types, and utilities
scripts/
  localstack-init.sh        - LocalStack resource initialization
docs/
  LOCALSTACK.md             - LocalStack setup guide
```

## Development Commands

### Running the Project

```bash
# Run all projects in dev mode
pnpm dev
# or using Nx
nx run-many --target=serve --all

# Run individual projects
cd apps/api && pnpm dev        # API server (tsx watch)
cd apps/web && pnpm dev        # Web client (Vite dev server)
```

### Building

```bash
# Build all projects
pnpm build
# or
nx run-many --target=build --all

# Build individual projects
nx build api    # TypeScript compilation
nx build web    # Vite build
```

### Testing & Quality

```bash
# Run all tests
pnpm test
nx run-many --target=test --all

# Linting
pnpm lint
nx run-many --target=lint --all

# Web-specific commands
cd apps/web
pnpm lint-fix                  # Auto-fix ESLint issues
pnpm prettier:check            # Check formatting
pnpm prettier:write            # Auto-format
pnpm typecheck                 # Type checking without build

# Type checking across all projects
pnpm type-check
```

### LocalStack (Local AWS Development)

```bash
# Start LocalStack
pnpm localstack:start

# Stop LocalStack
pnpm localstack:stop

# Check LocalStack status
pnpm localstack:status

# Initialize AWS resources (DynamoDB tables, S3 buckets)
pnpm localstack:init

# Start and initialize in one command
pnpm localstack:setup

# Test LocalStack integration
cd apps/api && pnpm exec tsx test-localstack.ts
```

### Git Commits

This project uses conventional commits enforced by commitlint. Valid types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`.

## Architecture

### Monorepo Setup

- **Build tool**: Nx 21.5.3 with pnpm workspace
- **Path aliases**: `@untitled-card-game/shared` maps to `libs/shared/src/index.ts`
- **Project structure**: Apps consume the shared library via workspace dependencies

### API (apps/api)

- **Framework**: Elysia with @elysiajs/node adapter
- **Real-time**: Socket.IO server for game state management
- **AWS SDK**: DynamoDB and S3 integration via AWS SDK v3
- **Entry point**: `src/index.ts`
- **Key architecture**:
  - HTTP server wraps Elysia app to enable Socket.IO integration
  - Game state stored in-memory via `Map<string, ABGame>` keyed by socket ID
  - Socket events: `game-init`, `game-next-round`, `hello-ws`
  - Environment-aware dotenv loading (`.env.{env}.local`, `.env.local`, `.env.{env}`, `.env`)
  - CORS configuration via CLIENT_URLS environment variable
  - LocalStack support for local AWS development
- **AWS Services**:
  - **DynamoDB**: Game session persistence via `GameSessionService`
  - **S3**: Asset storage (configured in `src/config/aws.ts`)
  - Auto-detects LocalStack vs production based on `AWS_ENDPOINT` environment variable

### Web (apps/web)

- **Framework**: React 19 + Vite + React Router
- **UI**: shadcn/ui, Tailwind CSS, Magic UI
- **State**: Zustand with persist and devtools middleware
- **Key features**:
  - Dark mode via next-themes
  - Socket.IO client for real-time game communication
  - Drag-and-drop via @dnd-kit
  - Views in `src/views/`: home, ab-mode, how-to-play, settings, credits, not-found
  - Route structure: `/`, `/game/four`, `/game/five`, `/how-to-play`, `/settings`, `/credits`

### Shared Library (libs/shared)

Core game logic and types shared between frontend and backend:

- **Core classes**: `ABGame`, `ABDeck`, `ABMode`, `ABCard`, `ABRank`, `ABSuit`
- **Game logic**: Card evaluation (poker hands), shuffling, deck generation
- **Pure functions**: Game state transformations are implemented as pure functions
- **Exports**: All exports defined in `src/index.ts`

### Key Game Concepts

- **AB Prefix**: "Arrange Better" - represents the core game mechanic
- **Grid modes**: "four" (4×4 grid) and "five" (5×5 grid)
- **Game flow**:
  1. Client initiates game with mode selection
  2. Server generates seed and deals initial hand
  3. Client places cards on grid and discards one
  4. Server deals next hand until grid is filled
  5. Game evaluates poker hands across rows/columns

### State Management

The web app uses Zustand with three slices:
- `high-scores-slice`: Player scores per mode
- `settings-slice`: User preferences
- `misc-slice`: UI state and temporary data

Store is persisted to localStorage and includes devtools integration.

### Socket.IO Communication Pattern

1. Client emits event (e.g., `game-init`)
2. Server validates, updates game state, emits response (e.g., `game-init-res`)
3. Server maintains per-socket game instances in `abGameMap`
4. Game state cleaned up on disconnect

## Development Notes

- Frontend uses absolute imports via `@/` path alias (configured in Vite)
- API server runs on port 3000 by default (configurable via PORT env var)
- Maintenance mode can be enabled via `isMaintenanceMode` flag in web utils
- Production deployment uses Docker (setup.sh, start.sh, stop.sh, cleanup.sh scripts)

### Environment Variables

API environment configuration (`.env.local`):
```bash
# LocalStack Configuration
AWS_ENDPOINT=http://localhost:4566  # Enables LocalStack mode
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test

# API Configuration
PORT=3000
CLIENT_URLS=http://localhost:5173
```

**Note**: When `AWS_ENDPOINT` is set, the API automatically uses LocalStack. Omit it in production to use real AWS services.

### LocalStack Setup

LocalStack provides local AWS service emulation for development:

1. **Prerequisites**: LocalStack installed via Homebrew, AWS CLI (`awscli-local`)
2. **Resources Created**:
   - DynamoDB table: `game-sessions` (game session persistence)
   - S3 bucket: `game-assets` (asset storage)
3. **Configuration**: `src/config/aws.ts` handles automatic LocalStack detection
4. **Services**: `src/services/game-session.service.ts` provides DynamoDB operations
5. **Testing**: `test-localstack.ts` validates integration
6. **Initialization**: `scripts/localstack-init.sh` sets up AWS resources
7. **Documentation**: See `docs/LOCALSTACK.md` for complete setup guide
