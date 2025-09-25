import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { node } from "@elysiajs/node";
import { Server } from "socket.io";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { createServer } from "http";
import { ABDeck, ABGame, ABMode } from "@untitled-card-game/shared";

const currentEnv = (process.env.APP_ENV || process.env.NODE_ENV || "development").toLowerCase();
const envPaths = [
  `.env.${currentEnv}.local`,
  `.env.local`,
  `.env.${currentEnv}`,
  `.env`,
].map((f) => path.resolve(process.cwd(), f));

for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath, override: true });
  }
}

const PORT = Number(process.env.PORT || 3000);
const CLIENT_URL = process.env.CLIENT_URL || "";

const app = new Elysia({ adapter: node() })
  .use(
    cors({
      origin: (request: Request) => {
        if (corsOrigin === true) return true;
        const requestOrigin = request.headers.get("origin") ?? "";
        if (Array.isArray(corsOrigin)) return corsOrigin.includes(requestOrigin);
        return false;
      },
      methods: ["GET", "POST", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type"],
    })
  )
  .get("/", () => "Hello World!");

const httpServer = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host}`);
    const requestInit: RequestInit = {
      method: req.method,
      headers: req.headers as any,
      body:
        req.method && ["GET", "HEAD"].includes(req.method) ? undefined : (req as any),
    };
    const request = new Request(url, requestInit);
    const response = await app.handle(request);

    res.statusCode = response.status;
    response.headers.forEach((value, key) => res.setHeader(key, value));

    if (!response.body) {
      res.end();
      return;
    }

    const reader = (response.body as any).getReader();
    const write = async () => {
      // stream chunks to Node response
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(Buffer.from(value));
      }
      res.end();
    };
    write().catch((err) => {
      console.error(err);
      res.end();
    });
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
});

httpServer.listen(PORT);

const isDev = (process.env.APP_ENV || process.env.NODE_ENV || "development").toLowerCase() === "development";
const clientUrlsEnv = (process.env.CLIENT_URLS || CLIENT_URL || "").split(",").map((s) => s.trim()).filter(Boolean);
const corsOrigin: any = clientUrlsEnv.length > 0 ? clientUrlsEnv : (isDev ? true : []);

const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

const abGameMap = new Map<string, ABGame>();

io.on("connection", (socket) => {
  console.info(`Client connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.info(`Client disconnected: ${socket.id}`);
    abGameMap.delete(socket.id);
  });

  socket.on("hello-ws", (payload: any) => {
    console.info(`Message received from client ${socket.id}:`, payload);
    socket.emit("hello-ws-res", {
      message: `Hello back to you, ${payload?.name}`,
    });
  });

  socket.on("game-init", (payload: any) => {
    console.info(`Message received from client ${socket.id}:`, payload);
    const { modeSlug } = payload ?? {};
    const mode = ABMode.getMode(modeSlug);
    if (!mode) {
      socket.emit("game-init-res", { error: "Invalid mode" });
      return;
    }
    const deck = new ABDeck();
    const abSeed = deck.generateSeed(mode.gridSize);
    const abGame = new ABGame(mode);
    abGame.setABSeed(abSeed);
    const abCards = abGame.dealHand(0);
    abGameMap.set(socket.id, abGame);

    socket.emit("game-init-res", { abCards });
  });

  socket.on("game-next-round", (payload: any) => {
    console.info(`Message received from client ${socket.id}:`, payload);
    const { abDiscard, newGrid } = payload ?? {};
    const abGame = abGameMap.get(socket.id);
    if (!abGame) return;

    abGame.abDiscards.push(abDiscard);
    abGame.grid = newGrid;
    abGameMap.set(socket.id, abGame);

    const updatedABGame = abGameMap.get(socket.id)!;
    const gridSize = updatedABGame.mode.gridSize;
    const gameOver = updatedABGame.abDiscards.length === gridSize;

    if (gameOver) {
      socket.emit("game-next-round-res", { gameOver });
      return;
    }

    const abCards = updatedABGame.dealHand(updatedABGame.abDiscards.length);
    socket.emit("game-next-round-res", { abCards });
  });
});

console.log(`🦊 Elysia is running on port ${PORT}`);
