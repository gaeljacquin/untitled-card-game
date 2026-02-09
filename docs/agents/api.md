# API

- Framework: Elysia with `@elysiajs/node`
- Real-time: Socket.IO server for game state
- Entry point: `apps/api/src/index.ts`
- Game state: in-memory `Map<string, ABGame>` keyed by socket ID
- Socket events: `game-init`, `game-next-round`, `hello-ws`
- Environment loading order: `.env.{env}.local`, `.env.local`, `.env.{env}`, `.env`
- CORS configured via `CLIENT_URLS`
