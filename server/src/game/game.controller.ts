import { Controller, Body, Post } from '@nestjs/common';
import { GameService } from '@/game/game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('abcheck')
  abCheck(@Body() wordMap: { [key: string]: unknown }) {
    return this.gameService.abCheckLambda(wordMap);
  }
}
