import { emptyHand } from '../constants/empty-hand';
import { ABCards } from '../core/card';
import { IABGridCell } from '../core/grid-cell';
import { ABMode } from '../core/mode';

class PokerHand {
  constructor(
    public readonly name: string,
    public readonly points: number,
    public readonly rankValue: number,
    public readonly cards: ABCards
  ) {}
}

export function evaluateHand(cards: ABCards): PokerHand {
  if (cards.length === 0) {
    return new PokerHand('Empty Hand', 0, 0, []);
  }

  if (cards.length < 4) {
    const countByRank = new Map<number, number>();
    cards.forEach((card) => {
      const rankValue = card.rank.value;
      countByRank.set(rankValue, (countByRank.get(rankValue) || 0) + 1);
    });

    const hasPair = Array.from(countByRank.values()).includes(2);
    const hasThreeOfAKind = Array.from(countByRank.values()).includes(3);

    if (hasThreeOfAKind) {
      return new PokerHand('Three of a Kind', 180, 4, cards);
    }

    if (hasPair) {
      return new PokerHand('One Pair', 5, 2, cards);
    }

    return new PokerHand('High Card', 0, 1, cards);
  }

  if (cards.length > 5) {
    throw new Error('Invalid number of cards');
  }

  const countBySuit = new Map<string, number>();
  const countByRank = new Map<number, number>();

  cards.forEach((card) => {
    const suitName = card.suit.label;
    const rankValue = card.rank.value;
    countBySuit.set(suitName, (countBySuit.get(suitName) || 0) + 1);
    countByRank.set(rankValue, (countByRank.get(rankValue) || 0) + 1);
  });

  const isFlush = countBySuit.size === 1;

  const sortedValues = Array.from(cards)
    .map((c) => c.rank.value)
    .sort((a, b) => a - b);

  const checkStraight = (values: number[]): boolean => {
    const isRegularStraight = values.every((val, idx) => idx === 0 || values[idx - 1] + 1 === val);

    if (isRegularStraight) return true;

    if (values.length === 4) {
      return values[0] === 1 && values[1] === 2 && values[2] === 3 && values[3] === 4;
    }

    if (values.length === 5) {
      return (
        values[0] === 1 && values[1] === 2 && values[2] === 3 && values[3] === 4 && values[4] === 5
      );
    }

    return false;
  };

  const valuesWithAceHigh = [...sortedValues];
  if (valuesWithAceHigh[0] === 1) {
    valuesWithAceHigh.push(14);
    valuesWithAceHigh.shift();
    valuesWithAceHigh.sort((a, b) => a - b);
  }

  const isStraight = checkStraight(sortedValues) || checkStraight(valuesWithAceHigh);

  const isRoyalFlush =
    cards.length === 5 &&
    isFlush &&
    new Set(sortedValues).has(10) &&
    new Set(sortedValues).has(11) &&
    new Set(sortedValues).has(12) &&
    new Set(sortedValues).has(13) &&
    new Set(sortedValues).has(1); // Ace

  if (isRoyalFlush) {
    return new PokerHand('Royal Flush', 800, 10, cards);
  }

  if (isFlush && isStraight) {
    return new PokerHand('Straight Flush', 450, 9, cards);
  }

  const hasFourOfAKind = Array.from(countByRank.values()).includes(4);
  if (hasFourOfAKind) {
    return new PokerHand('Four of a Kind', 325, 8, cards);
  }

  const hasThreeOfAKind = Array.from(countByRank.values()).includes(3);
  const pairCount = Array.from(countByRank.values()).filter((count) => count === 2).length;

  if (cards.length === 5 && hasThreeOfAKind && pairCount === 1) {
    return new PokerHand('Full House', 250, 7, cards);
  }

  if (isFlush) {
    return new PokerHand('Flush', 125, 6, cards);
  }

  if (isStraight) {
    return new PokerHand('Straight', 80, 5, cards);
  }

  if (hasThreeOfAKind) {
    return new PokerHand('Three of a Kind', 180, 4, cards);
  }

  if (pairCount === 2) {
    return new PokerHand('Two Pair', 60, 3, cards);
  }

  if (pairCount === 1) {
    return new PokerHand('One Pair', 5, 2, cards);
  }

  return new PokerHand('High Card', 0, 1, cards);
}

export const evaluateGridRow = (grid: IABGridCell[][], rowIndex: number) => {
  const rowCards = grid[rowIndex].map((cell) => cell.card).filter((card) => card !== null);
  const result = evaluateHand(rowCards);
  const name = result.name;
  const points = result.points;

  return {
    name,
    points,
  };
};

export const evaluateGridColumn = (grid: IABGridCell[][], columnIndex: number) => {
  const columnCards = grid.map((row) => row[columnIndex].card).filter((card) => card !== null);
  const result = evaluateHand(columnCards);
  const name = result.name;
  const points = result.points;

  return {
    name,
    points,
  };
};

export const evaluateSpecialGridCells = (grid: IABGridCell[][]) => {
  const gridSize = grid.length;

  if (gridSize !== 4 && gridSize !== 5) {
    return {
      name: 'Invalid Grid Size',
      points: 0,
    };
  }

  const cornerCards = [
    grid[0][0].card,
    grid[0][gridSize - 1].card,
    grid[gridSize - 1][0].card,
    grid[gridSize - 1][gridSize - 1].card,
  ].filter((card) => card !== null);

  if (gridSize === 5) {
    const centerCard = grid[2][2]?.card;

    if (centerCard) {
      cornerCards.push(centerCard);
    }
  }

  if (cornerCards.length < 2) {
    return emptyHand;
  }

  const result = evaluateHand(cornerCards);

  // Only count pairs with corner cards or the center card
  if (result.name === 'One Pair') {
    const [card1, card2] = cornerCards.filter((card, _, self) =>
      self.some((otherCard) => otherCard !== card && otherCard.rank.value === card.rank.value)
    );

    const card1Row = grid.findIndex((row) => row.some((cell) => cell.card === card1));
    const card1Col = card1Row !== -1 ? grid[card1Row].findIndex((cell) => cell.card === card1) : -1;
    const card2Row = grid.findIndex((row) => row.some((cell) => cell.card === card2));
    const card2Col = card2Row !== -1 ? grid[card2Row].findIndex((cell) => cell.card === card2) : -1;

    if (card1Row === card2Row || card1Col === card2Col) {
      return emptyHand;
    }
  }

  return {
    name: result.name,
    points: Math.ceil(result.points * 2),
  };
};

export const evaluateDiscardPile = (discardPile: ABCards) => {
  const result = evaluateHand(discardPile);
  const name = result.name;
  const points = result.points;

  return {
    name,
    points,
  };
};

export const calculateScore = (grid: IABGridCell[][], mode: ABMode, discardPile: ABCards) => {
  const gridSize = grid.length;
  let score = 0;
  let numRowHands = 0;
  let numColHands = 0;
  let discardBonus = emptyHand;
  let specialBonus = emptyHand;

  for (let row = 0; row < gridSize; row++) {
    const rowEval = evaluateGridRow(grid, row);
    score += rowEval.points;
    numRowHands += Math.min(Math.max(0, rowEval.points), 1);
  }

  for (let col = 0; col < gridSize; col++) {
    const colEval = evaluateGridColumn(grid, col);
    score += colEval.points;
    numColHands += Math.min(Math.max(0, colEval.points), 1);
  }

  const numHands = numRowHands + numColHands;

  if (numHands >= mode.minHandsDiscard) {
    discardBonus = evaluateDiscardPile(discardPile);
  }

  if (numHands >= mode.minHandsSpecial) {
    specialBonus = evaluateSpecialGridCells(grid);
  }

  return { score, discardBonus, specialBonus, numRowHands, numColHands };
};

