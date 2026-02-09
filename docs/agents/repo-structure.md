# Repo Structure

Top-level layout:
- `apps/api` Elysia backend server with Socket.IO
- `apps/web` React frontend (Vite + React Router)
- `libs/shared` Shared game logic, types, and utilities
- `scripts` Operational scripts (deployment)

## Monorepo Setup
This project uses **Turborepo** to manage the monorepo tasks.
- Configuration: `turbo.json` in the root.
- Caching: Build outputs, linting, and tests are cached by Turbo.
- Task orchestration: Commands like `bun build` or `bun lint` in the root trigger Turbo to run the corresponding tasks across all packages.
