import { ABCard, emptyHand, IABGridCell } from '@untitled-card-game/shared';
import { GameState } from '@/types/game-state';

export function getGameState(grid: IABGridCell[][]): GameState {
  const totalCells = grid ? grid.length * grid[0]?.length : 0;
  const playedCards = grid.flat().filter((cell) => cell.card?.played).length;

  return {
    gameOver: isGridFull(grid),
    totalCards: totalCells,
    playedCards,
    score: 0,
    discardBonus: emptyHand,
    specialBonus: emptyHand,
  };
}

export function isGridFull(grid: IABGridCell[][]): boolean {
  return grid.every((row) => row.every((cell) => cell.card !== null));
}

export function canMoveCard(card: ABCard): boolean {
  return !card.played;
}
