import { emptyHand } from '@annabelle/shared/constants/empty-hand';

export type GameState = {
  gameOver: boolean;
  totalCards: number;
  playedCards: number;
  score: number;
  discardBonus: typeof emptyHand;
  specialBonus: typeof emptyHand;
};
