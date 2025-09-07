import { emptyHand } from '@gaeljacquin/ucg-shared';

export type GameState = {
  gameOver: boolean;
  totalCards: number;
  playedCards: number;
  score: number;
  discardBonus: typeof emptyHand;
  specialBonus: typeof emptyHand;
};
