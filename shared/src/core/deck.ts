import { fyshuffle } from '../functions/shuffle';
import { ABCard, ABCards } from './card';
import { Rank } from './rank';
import { Suit } from './suit';

interface IABDeck {
  abSeed: ABCards[];
  getCards(): ABCards;
}

export class ABDeck implements IABDeck {
  private cards: ABCards = [];
  public readonly abSeed: ABCards[] = [];

  constructor() {
    this.cards = this.createDeck();
  }

  private createDeck(): ABCards {
    this.cards = [];
    const ranks = Rank.getAll();
    const suits = Suit.getAll();

    suits.forEach((suit) => {
      ranks.forEach((rank) => {
        const card = new ABCard(rank, suit);

        this.cards.push(card);
      });
    });

    return this.cards;
  }

  public getCards(): ABCards {
    return this.cards;
  }

  public generateSeed(gridSize: number): ABCards[] {
    if (gridSize <= 0) {
      throw new Error('Grid size must be positive');
    }

    const cards = this.getCards();
    const cardsNeeded = gridSize * (gridSize + 1);

    if (cards.length < cardsNeeded) {
      throw new Error('Not enough cards for the requested grid size');
    }

    const shuffledDeck = fyshuffle(cards) as ABCards;
    const cardsPerRow = gridSize + 1;

    // Create rows of sequential cards from the shuffled deck
    return Array.from({ length: gridSize }, (_, rowIndex) =>
      shuffledDeck.slice(rowIndex * cardsPerRow, (rowIndex + 1) * cardsPerRow)
    );
  }

  public _toStringArray(): string[] {
    const cards = this.getCards();

    return cards.map((card) => {
      return card._toString();
    });
  }
}
