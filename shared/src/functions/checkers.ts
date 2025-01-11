import { ABCard } from '../core/card';
import { IGridCell } from '../core/grid-cell';

class PokerHand {
  constructor(
    public readonly name: string,
    public readonly points: number,
    public readonly rank: number,
    public readonly cards: ABCard[]
  ) {}
}

export function evaluatePokerHands(cards: ABCard[]): PokerHand {
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
    throw new Error('A poker hand cannot contain more than 5 cards');
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

export const evaluateRowHand = (grid: IGridCell[][], rowIndex: number) => {
  const rowCards = grid[rowIndex].map((cell) => cell.card).filter((card) => card !== null);
  const result = evaluatePokerHands(rowCards);
  const name = result.name;
  const points = result.points;

  return {
    name,
    points,
  };
};

export const evaluateColumnHand = (grid: IGridCell[][], columnIndex: number) => {
  const columnCards = grid.map((row) => row[columnIndex].card).filter((card) => card !== null);
  const result = evaluatePokerHands(columnCards);
  const name = result.name;
  const points = result.points;

  return {
    name,
    points,
  };
};

export const evaluateSpecialHand = (grid: IGridCell[][]) => {
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
    return {
      name: 'Empty Hand',
      points: 0,
    };
  }

  const result = evaluatePokerHands(cornerCards);

  return {
    name: result.name + '*',
    points: Math.ceil(result.points * 1.5),
  };
};

export const evaluateRowWord = (grid: IGridCell[][], row: number) => {
  if (!grid || !grid[row] || row < 0 || row >= grid.length) {
    return {
      name: '',
      points: 0,
    };
  }

  let wordValue = 0;
  let hasAtLeastOneCard = false;

  for (let col = 0; col < grid[row].length; col++) {
    const cell = grid[row][col];
    const card = cell?.card;

    if (card) {
      wordValue += card.rank.value;
      hasAtLeastOneCard = true;
    }
  }

  return {
    name: '',
    points: hasAtLeastOneCard ? wordValue : 0,
  };
};

export const evaluateColumnWord = (grid: IGridCell[][], col: number) => {
  if (!grid || col < 0 || col >= (grid[0]?.length || 0)) {
    return {
      name: '',
      points: 0,
    };
  }

  let wordValue = 0;
  let hasAtLeastOneCard = false;

  for (let row = 0; row < grid.length; row++) {
    const cell = grid[row]?.[col];
    const card = cell?.card;

    if (card) {
      wordValue += card.rank.value;
      hasAtLeastOneCard = true;
    }
  }

  return {
    name: '',
    points: hasAtLeastOneCard ? wordValue : 0,
  };
};

export const evaluateSpecialWord = (grid: IGridCell[][]) => {
  if (!grid || grid.length !== 5 || !grid[0] || grid[0].length !== 5) {
    return {
      name: '',
      points: 0,
    };
  }

  const cornerCards = [
    grid[0][0]?.card,
    grid[0][4]?.card,
    grid[4][0]?.card,
    grid[4][4]?.card,
  ].filter((card): card is NonNullable<typeof card> => card !== null);

  const centerCard = grid[2]?.[2]?.card;
  if (centerCard) {
    cornerCards.push(centerCard);
  }

  const points = cornerCards.reduce((sum, card) => sum + card.rank.value, 0);

  return {
    name: '',
    points,
  };
};
