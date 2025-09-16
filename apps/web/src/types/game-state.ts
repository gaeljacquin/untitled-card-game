import { BonusResult } from '@untitled-card-game/shared';

export type GameState = {
  gameOver: boolean;
  totalCards: number;
  playedCards: number;
  score: number;
  discardBonus?: BonusResult;
  specialBonus?: BonusResult;
};
