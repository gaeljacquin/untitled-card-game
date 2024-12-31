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
import { ABCard } from '@annabelle/shared/dist/core/card';
import { dealCards } from '@annabelle/shared/dist/functions/card';
import { maxDeal } from '@annabelle/shared/dist/constants/other';
import { GameService } from '@/src/game/game.service';

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
    const game = payload.game;
    const startingCard = new ABCard(true);
    const playerCards = dealCards(maxDeal);
    const emit = {
      startingCard,
      playerCards,
    };
    this.abGameMap.set(client.id, { game, ...emit });

    client.emit('game-init-res', {
      ...emit,
    });
  }

  @SubscribeMessage('ab-check')
  async abCheck(client: Socket, payload: any): Promise<void> {
    const abCards = payload.abCards;
    const abWord = abCards.map((card) => card._letter).join('');
    console.info(`AB Cards received from client ${client.id}: ${abCards}`);
    console.info('abWord: ', abWord);
    const abCheckRes = await this.gameService.abCheckLambda(abWord);
    const valid = abCheckRes['is_ab_word'] || abCheckRes['is_ab_prefix'];
    const emit = { abWord, valid };

    client.emit('ab-check-res', emit);
  }
}
