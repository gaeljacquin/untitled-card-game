import { emptyHand } from '@untitled-card-game/shared/constants/empty-hand';

export type GameState = {
  gameOver: boolean;
  totalCards: number;
  playedCards: number;
  score: number;
  discardBonus: typeof emptyHand;
  specialBonus: typeof emptyHand;
};
