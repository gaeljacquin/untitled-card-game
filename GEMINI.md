# GEMINI.md

This file provides guidance to Gemini when working with code in this repository.

## Project Overview

Untitled Card Game (UCG) is a card-based puzzle game where players arrange cards in a grid to create high-scoring poker hands. It is a monorepo built with [Nx](https://nx.dev), [Bun](https://bun.sh), and TypeScript.

The project consists of three main parts:
-   `apps/api`: An [Elysia.js](https://elysiajs.com/) backend server that uses [Socket.IO](https://socket.io/) for real-time game state management. It also integrates with AWS services like DynamoDB and S3.
-   `apps/web`: A [React](https://react.dev/) frontend built with [Vite](https://vitejs.dev/). It uses [Zustand](https://github.com/pmndrs/zustand) for state management, [Tailwind CSS](https://tailwindcss.com/) and [shadcn/ui](https://ui.shadcn.com/) for styling.
-   `libs/shared`: A shared library containing the core game logic, types, and utilities used by both the frontend and backend.

## Development Commands

The project uses `bun` as the package manager and script runner.

### Running the Project

To run all projects in development mode:
```bash
bun dev
```
This will start the API server and the web client.

To run individual projects:
```bash
# API server (with hot-reload)
nx serve api

# Web client (Vite dev server)
nx serve web
```

### Building

To build all projects:
```bash
bun build
```
or
```bash
nx run-many --target=build --all
```

To build a specific project:
```bash
nx build api
nx build web
```

### Testing & Quality

To run all tests:
```bash
bun test
```

To run linting:
```bash
bun lint
```

To run type checking across all projects:
```bash
bun type-check
```

The web application has additional scripts for formatting and fixing lint issues. Refer to `apps/web/package.json` for more details.

## Architecture

### Monorepo Setup

-   **Build tool**: Nx is used to manage the monorepo, build, and task orchestration.
-   **Path aliases**: The shared library is accessible via the `@untitled-card-game/shared` alias. The web application uses the `@/` alias for its internal modules.
-   **Project structure**: Applications in the `apps` directory consume the shared library from the `libs` directory.

### API (`apps/api`)

-   **Framework**: Elysia.js
-   **Real-time**: Socket.IO is used for real-time communication with the client.
-   **AWS Integration**: The API interacts with AWS DynamoDB and S3.
-   **Entry point**: `src/index.ts`

### Web (`apps/web`)

-   **Framework**: React 19 + Vite + React Router
-   **UI**: shadcn/ui, Tailwind CSS, and other libraries for UI components.
-   **State Management**: Zustand is used for global state management, with state persisted to `localStorage`.
-   **Views**: The main application views are located in `src/views/`.

### Shared Library (`libs/shared`)

-   Contains the core game logic, including classes for the game, deck, cards, etc.
-   The logic is written as pure functions where possible.
-   All exports are defined in `src/index.ts`.

## Git Commits

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. Commits are linted using `commitlint`.
Valid commit types are: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`.
