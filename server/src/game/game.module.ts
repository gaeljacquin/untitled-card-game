import { Module } from '@nestjs/common';
import { GameService } from '@/src/game/game.service';

@Module({
  providers: [GameService],
})
export class GameModule {}
