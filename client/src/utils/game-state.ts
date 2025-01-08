import { ABCard } from '@annabelle/shared/core/card';
import { IGridCell } from '@annabelle/shared/core/grid-cell';
import { ABCards } from '@annabelle/shared/core/word';
import { GameState } from '@/types/game-state';

export function getGameState(grid: IGridCell[][]): GameState {
  const totalCells = grid ? grid.length * grid[0]?.length : 0;
  const playedCards = grid.flat().filter((cell) => cell.card?.played).length;

  return {
    gameOver: isGridFull(grid),
    totalCards: totalCells,
    playedCards,
  };
}

export function isGridFull(grid: IGridCell[][]): boolean {
  return grid.every((row) => row.every((cell) => cell.card !== null));
}

export function canMoveCard(card: ABCard, playerHand: ABCards): boolean {
  // If the card is already played, it cannot be moved
  if (card.played) return false;

  // If it's the last card in hand, only allow swapping
  if (playerHand.length === 1 && playerHand[0].id === card.id) {
    return false;
  }

  return true;
}
