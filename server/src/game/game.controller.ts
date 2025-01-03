import { Controller, Get, Query } from '@nestjs/common';
import { GameService } from '@/game/game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('abcheck')
  abCheck(@Query('word') word: string) {
    return this.gameService.abCheckLambda(word);
  }
}
