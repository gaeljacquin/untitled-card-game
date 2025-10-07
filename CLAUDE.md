# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Untitled Card Game (UCG) is a card-based puzzle game where players arrange cards in a grid to create high-scoring poker hands. Built as an Nx monorepo with TypeScript, featuring a React/Vite frontend, Elysia backend with Socket.IO for real-time game state, and shared game logic.

## Repository Structure

```
apps/
  api/          - Elysia backend server with Socket.IO
  web/          - React frontend (Vite + React Router)
libs/
  shared/       - Shared game logic, types, and utilities
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
- **Entry point**: `src/index.ts`
- **Key architecture**:
  - HTTP server wraps Elysia app to enable Socket.IO integration
  - Game state stored in-memory via `Map<string, ABGame>` keyed by socket ID
  - Socket events: `game-init`, `game-next-round`, `hello-ws`
  - Environment-aware dotenv loading (`.env.{env}.local`, `.env.local`, `.env.{env}`, `.env`)
  - CORS configuration via CLIENT_URLS environment variable

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
- **Grid modes**: "four" (5x5 grid) and "five" (6x6 grid)
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
