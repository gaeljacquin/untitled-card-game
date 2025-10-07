import {
  ABCard,
  ABCards,
  findBestJokerValue,
  IABGridCell,
  Rank,
  Suit,
} from '@untitled-card-game/shared';

import { isJokerCard } from './card-helpers';

export type JokerEvaluation = {
  cardId: string;
  rank: Rank;
  suit: Suit;
};

/**
 * Evaluates a joker card placed at a specific position in the grid.
 * Compares the best possible hand for both the row and column,
 * then assigns the joker the value that maximizes the score.
 */
export function evaluateJokerAtPosition(
  grid: IABGridCell[][],
  rowIndex: number,
  columnIndex: number,
  jokerCard: ABCard
): JokerEvaluation | null {
  if (!isJokerCard(jokerCard)) {
    return null;
  }

  // Get all cards in the same row (excluding the joker itself)
  const rowCards: ABCards = grid[rowIndex]
    .map((cell) => cell.card)
    .filter((card): card is ABCard => card !== null && card.id !== jokerCard.id);

  // Get all cards in the same column (excluding the joker itself)
  const columnCards: ABCards = grid
    .map((row) => row[columnIndex].card)
    .filter((card): card is ABCard => card !== null && card.id !== jokerCard.id);

  // Evaluate best hand for row with joker
  const rowWithJoker = [...rowCards, jokerCard];
  const rowEval = findBestJokerValue(rowWithJoker);

  // Evaluate best hand for column with joker
  const colWithJoker = [...columnCards, jokerCard];
  const colEval = findBestJokerValue(colWithJoker);

  // Choose the better hand
  if (!rowEval && !colEval) {
    // Default to Ace of the joker's base suit if no evaluation available
    const baseSuit =
      typeof jokerCard.getBaseSuit === 'function' ? jokerCard.getBaseSuit() : jokerCard.suit;
    return {
      cardId: jokerCard.id,
      rank: Rank.getById('ace'),
      suit: baseSuit,
    };
  }

  if (!rowEval && colEval) {
    return {
      cardId: jokerCard.id,
      rank: colEval.rank,
      suit: colEval.suit,
    };
  }

  if (rowEval && !colEval) {
    return {
      cardId: jokerCard.id,
      rank: rowEval.rank,
      suit: rowEval.suit,
    };
  }

  // Both evaluations exist, choose the better one
  const rowHand = rowEval!.hand;
  const colHand = colEval!.hand;

  if (
    rowHand.points > colHand.points ||
    (rowHand.points === colHand.points && rowHand.rankValue > colHand.rankValue)
  ) {
    return {
      cardId: jokerCard.id,
      rank: rowEval!.rank,
      suit: rowEval!.suit,
    };
  }

  return {
    cardId: jokerCard.id,
    rank: colEval!.rank,
    suit: colEval!.suit,
  };
}

/**
 * Finds all jokers in the grid and re-evaluates them.
 * This should be called whenever a card is placed or moved.
 */
export function evaluateAllJokersInGrid(grid: IABGridCell[][]): JokerEvaluation[] {
  const jokerEvaluations: JokerEvaluation[] = [];

  grid.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      if (cell.card && isJokerCard(cell.card)) {
        const evaluation = evaluateJokerAtPosition(grid, rowIndex, columnIndex, cell.card);
        if (evaluation) {
          jokerEvaluations.push(evaluation);
        }
      }
    });
  });

  return jokerEvaluations;
}

/**
 * Applies joker values to the grid by setting each joker card's value.
 * This mutates the joker cards in the grid.
 */
export function applyJokerValuesToGrid(
  grid: IABGridCell[][],
  jokerEvaluations: JokerEvaluation[]
): IABGridCell[][] {
  const jokerMap = new Map(jokerEvaluations.map((je) => [je.cardId, je]));

  return grid.map((row) =>
    row.map((cell) => {
      if (cell.card && isJokerCard(cell.card)) {
        const evaluation = jokerMap.get(cell.card.id);
        if (evaluation && typeof cell.card.setJokerValue === 'function') {
          // Directly mutate the card object to set joker value
          cell.card.setJokerValue(evaluation.rank, evaluation.suit);
        }
      }
      return cell;
    })
  );
}
