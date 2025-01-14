import { ABCard, ABCards } from './card';
import { Rank } from './rank';
import { Suit } from './suit';

interface IABDeck {
  seededCards: ABCards[];
  getCards(): ABCards;
}

export class ABDeck implements IABDeck {
  private cards: ABCards = [];
  public readonly seededCards: ABCards[] = [];

  constructor() {
    this.cards = this.createDeck();
  }

  private createDeck(): ABCards {
    this.cards = [];
    const ranks = Rank.getAll();
    const suits = Suit.getAll();

    for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
      for (let rankIndex = 1; rankIndex <= ranks.length; rankIndex++) {
        const card = new ABCard(ranks[rankIndex], suits[suitIndex]);
        this.cards.push(card);
      }
    }

    return this.cards;
  }

  public getCards(): ABCards {
    return this.cards;
  }

  public generateSeed(gridSize: number): ABCards[] {
    const cards = this.getCards();
    const seed: ABCards[] = [];
    const cardsPerDeal = gridSize + 1;

    for (let i = 0; i < gridSize; i++) {
      const deals: ABCards = [];

      for (let j = 0; j < cardsPerDeal; j++) {
        deals.push(cards[i * cardsPerDeal + j]);
      }

      seed.push(deals);
    }

    return seed;
  }

  public _toString(): string[] {
    const cards = this.getCards();

    return cards.map((card) => {
      return card._toString();
    });
  }
}
