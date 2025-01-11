import { ABCards } from '../core/card';
import { IGridCell } from '../core/grid-cell';
import { PokerHand } from '../core/poker-hand';

export function evaluatePokerHands(cards: ABCards): PokerHand {
  if (!(cards.length === 4 || cards.length === 5)) {
    throw new Error('Invalid number of 4 cards');
  }

  const countBySuit = new Map<string, number>();
  const countByRank = new Map<number, number>();

  cards.forEach((card) => {
    const suitName = card.getSuit().label;
    const rankValue = card.getRank().value;
    countBySuit.set(suitName, (countBySuit.get(suitName) || 0) + 1);
    countByRank.set(rankValue, (countByRank.get(rankValue) || 0) + 1);
  });

  const isFlush = countBySuit.size === 1;

  const values = Array.from(cards)
    .map((c) => c.getRank().value)
    .sort((a, b) => a - b);

  const isStraight = values.every((val, idx) => idx === 0 || values[idx - 1] + 1 === val);
  const isAceLowStraight = values[0] === 1 && values[1] === 2 && values[2] === 3 && values[3] === 4;
  const isAceHighStraight =
    values[0] === 1 && values[1] === 11 && values[2] === 12 && values[3] === 13;

  const isRoyalFlush =
    cards.length === 5 &&
    isFlush &&
    values[0] === 1 &&
    values[1] === 10 &&
    values[2] === 11 &&
    values[3] === 12 &&
    values[4] === 13;

  if (isRoyalFlush) {
    return new PokerHand('Royal Flush', 800, 10, cards);
  }

  if (isFlush && (isStraight || isAceLowStraight || isAceHighStraight)) {
    return new PokerHand('Straight Flush', 450, 8, cards);
  }

  const hasFourOfAKind = Array.from(countByRank.values()).includes(4);
  if (hasFourOfAKind) {
    return new PokerHand('Four of a Kind', 325, 7, cards);
  }

  const hasThreeOfAKind = Array.from(countByRank.values()).includes(3);
  const pairCount = Array.from(countByRank.values()).filter((count) => count === 2).length;

  if (cards.length === 5 && hasThreeOfAKind && pairCount === 1) {
    return new PokerHand('Full House', 250, 7, cards);
  }

  if (isFlush) {
    return new PokerHand('Flush', 125, 5, cards);
  }

  if (isStraight || isAceLowStraight) {
    return new PokerHand('Straight', 80, 4, cards);
  }

  if (hasThreeOfAKind) {
    return new PokerHand('Three of a Kind', 180, 6, cards);
  }

  if (pairCount === 2) {
    return new PokerHand('Two Pairs', 60, 3, cards);
  }

  if (pairCount === 1) {
    return new PokerHand('Pair', 5, 2, cards);
  }

  return new PokerHand('High Card', 0, 1, cards);
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
