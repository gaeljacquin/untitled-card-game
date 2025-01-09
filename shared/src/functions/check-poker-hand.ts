import { ABCard } from '../core/card';
import { IGridCell } from '../core/grid-cell';
import { PokerHand } from '../core/poker-hand';
import { Rank } from '../core/rank';

export function isSequential(values: number[]): boolean {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted.every((val, i) => i === 0 || val === sorted[i - 1] + 1);
}

export function evaluatePokerHand(cards: (ABCard | null)[]): PokerHand {
  const validCards = cards.filter((card): card is ABCard => card !== null);

  if (validCards.length < 5) return null;

  const values = validCards.map((card) => card.rank.value);
  const suits = validCards.map((card) => card.suit);
  const isFlush = suits.every((suit) => suit === suits[0]);
  const valueFrequency = values.reduce(
    (acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>
  );
  const cardValues = Rank.getAllValues();

  const frequencies = Object.values(valueFrequency).sort((a, b) => b - a);
  const isStraight = isSequential(values);

  if (isFlush && isStraight && Math.max(...values) === cardValues.length - 1) {
    return 'Royal Flush';
  }
  if (isFlush && isStraight) return 'Straight Flush';
  if (frequencies[0] === 4) return 'Four of a Kind';
  if (frequencies[0] === 3 && frequencies[1] === 2) return 'Full House';
  if (isFlush) return 'Flush';
  if (isStraight) return 'Straight';
  if (frequencies[0] === 3) return 'Three of a Kind';
  if (frequencies[0] === 2 && frequencies[1] === 2) return 'Two Pair';
  if (frequencies[0] === 2) return 'One Pair';
  return 'High Card';
}

export function evaluateGrid(grid: IGridCell[][]): { rows: PokerHand[]; cols: PokerHand[] } {
  const rows = grid.map((row) => evaluatePokerHand(row.map((cell) => cell.card)));
  const cols = Array(grid[0].length)
    .fill(null)
    .map((_, i) => evaluatePokerHand(grid.map((row) => row[i].card)));
  return { rows, cols };
}

export function calculateAvailableSpaces(
  grid: IGridCell[][],
  index: number,
  isRow: boolean
): number {
  if (isRow) {
    return grid[index].filter((cell) => !cell.card).length;
  }
  return grid.map((row) => row[index]).filter((cell) => !cell.card).length;
}
