import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import cors from '@/utils/cors';
import { ABGame } from '@annabelle/shared/dist/core/game';
import { GameService } from '@/game/game.service';
import { ABMode } from '@annabelle/shared/dist/core/mode';

@WebSocketGateway({ cors })
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly gameService: GameService) {}

  @WebSocketServer() server: Server;

  private abGameMap = new Map<string, ABGame>();

  async afterInit() {
    console.info('WebSocket server initialized');
  }

  async handleConnection(client: Socket, ...args: any[]) {
    console.info(`Client connected: ${client.id}`);
    console.info('args: ', args);
  }

  handleDisconnect(client: Socket) {
    console.info(`Client disconnected: ${client.id}`);
    this.abGameMap.delete(client.id);
  }

  @SubscribeMessage('hello-ws')
  async wsHello(client: Socket, payload: any): Promise<void> {
    console.info(`Message received from client ${client.id}: ${payload}`);

    client.emit('hello-ws-res', {
      message: `Hello back to you, ${payload.name}`,
    });
  }

  @SubscribeMessage('game-init')
  async gameInit(client: Socket, payload: any): Promise<void> {
    console.info(`Message received from client ${client.id}: ${payload}`);
    const { modeSlug } = payload;
    const mode = ABMode.getMode(modeSlug);
    const abGame = new ABGame(mode);
    const abCards = abGame.deal(0);
    const emit = {
      abCards,
    };
    this.abGameMap.set(client.id, abGame);

    client.emit('game-init-res', {
      ...emit,
    });
  }

  @SubscribeMessage('game-next-round')
  async gameNextRound(client: Socket, payload: any): Promise<void> {
    console.info(`Message received from client ${client.id}: ${payload}`);
    const { discardedABCard, newGrid } = payload;
    const abGame = this.abGameMap.get(client.id);
    abGame.discardedABCards.push(discardedABCard);
    abGame.grid = newGrid;
    this.abGameMap.set(client.id, abGame);
    const updatedABGame = this.abGameMap.get(client.id);
    const gridSize = updatedABGame.mode.gridSize;
    let emit = {};

    if (updatedABGame.discardedABCards.length === gridSize) {
      emit = {
        gameOver: true,
        abResult: null,
      };
    } else {
      const abCards = updatedABGame.deal(updatedABGame.discardedABCards.length);
      emit = {
        abCards,
      };
    }

    client.emit('game-next-round-res', {
      ...emit,
    });
  }
}
