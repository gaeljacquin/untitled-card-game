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
import { dealCards } from '@annabelle/shared/dist/functions/card';
import { maxDeal } from '@annabelle/shared/dist/constants/other';
import { GameService } from '@/game/game.service';
import { ABWord } from '@annabelle/shared/dist/core/word';

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
    const abWord = new ABWord();
    const startingCard = abWord.getStartingCard();
    const playerCards = dealCards(maxDeal);
    const emit = {
      startingCard,
      playerCards,
    };
    this.abGameMap.set(client.id, { ...game, ...emit });

    client.emit('game-init-res', {
      ...emit,
    });
  }

  @SubscribeMessage('ab-check')
  async abCheck(client: Socket, payload: any): Promise<void> {
    const abCards = payload.abCards;
    const abWordPlain = abCards.map((card) => card._letter).join(''); // TODO: Change this later
    const abCheckRes = await this.gameService.abCheckLambda(abWordPlain);
    const valid =
      abCheckRes['ab_word']['valid'] || abCheckRes['ab_prefix']['valid'];
    const emit = { status: 'ok', abWordPlain, valid };

    client.emit('ab-check-res', emit);
  }
}
