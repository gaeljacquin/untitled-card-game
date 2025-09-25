import { fyshuffle } from '../functions/shuffle';
import { ABCard, ABCards } from './card';
import { Rank } from './rank';
import { Suit } from './suit';

interface IABDeck {
  abSeed: ABCards[];
  getCards(): ABCards;
}

// Pure function to create a deck of cards
const createDeckCards = (): ABCards => {
  const ranks = Rank.getAll();
  const suits = Suit.getAll();
  const cards: ABCards = [];

  suits.forEach((suit) => {
    ranks.forEach((rank) => {
      const card = new ABCard(rank, suit);
      cards.push(card);
    });
  });

  return cards;
};

// Pure function to generate seed from cards
const generateSeedFromCards = (cards: ABCards, gridSize: number): ABCards[] => {
  if (gridSize <= 0) {
    throw new Error('Grid size must be positive');
  }

  const cardsNeeded = gridSize * (gridSize + 1);

  if (cards.length < cardsNeeded) {
    throw new Error('Not enough cards for the requested grid size');
  }

  const shuffledDeck = fyshuffle([...cards]) as ABCards; // Create copy for shuffling
  const cardsPerRow = gridSize + 1;

  // Create rows of sequential cards from the shuffled deck
  return Array.from({ length: gridSize }, (_, rowIndex) =>
    shuffledDeck.slice(rowIndex * cardsPerRow, (rowIndex + 1) * cardsPerRow)
  );
};

// Pure function to convert cards to string array
const cardsToStringArray = (cards: ABCards): string[] => {
  return cards.map((card) => card._toString());
};

export class ABDeck implements IABDeck {
  private cards: ABCards = [];
  public readonly abSeed: ABCards[] = [];

  constructor() {
    this.cards = createDeckCards(); // Use pure function
  }


  public getCards(): ABCards {
    return [...this.cards]; // Return copy to maintain immutability
  }

  public generateSeed(gridSize: number): ABCards[] {
    return generateSeedFromCards(this.cards, gridSize); // Use pure function
  }

  public _toStringArray(): string[] {
    return cardsToStringArray(this.cards); // Use pure function
  }
}
