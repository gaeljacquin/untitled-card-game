import { ABCard } from '@annabelle/shared/core/card';
import { IGridCell } from '@annabelle/shared/core/grid-cell';
import { GameState } from '@/types/game-state';

export function getGameState(grid: IGridCell[][]): GameState {
  const totalCells = grid ? grid.length * grid[0]?.length : 0;
  const playedCards = grid.flat().filter((cell) => cell.card?.played).length;

  return {
    gameOver: isGridFull(grid),
    totalCards: totalCells,
    playedCards,
    totalScore: 0,
    bonusPoints: 0,
  };
}

export function isGridFull(grid: IGridCell[][]): boolean {
  return grid.every((row) => row.every((cell) => cell.card !== null));
}

export function canMoveCard(card: ABCard): boolean {
  return !card.played;
}
