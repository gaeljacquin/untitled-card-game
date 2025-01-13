import { ABCard, ABCards, ABJoker } from './card';
import { ABMode } from './mode';
import { Rank } from './rank';
import { Suit } from './suit';

const NUM_JOKERS = 2;

interface IABDeck {
  seededCards: ABCards[];
  getCards(): ABCards;
}

export class ABDeck implements IABDeck {
  private cards: ABCards = [];
  public readonly seededCards: ABCards[] = [];

  constructor(mode: ABMode) {
    this.cards = this.createDeck(mode);
  }

  private createDeck(mode: ABMode): ABCards {
    this.cards = [];
    const ranks = Rank.getAll();
    const suits = Suit.getAll();

    for (let suitIndex = 0; suitIndex < suits.length; suitIndex++) {
      for (let rankIndex = 1; rankIndex <= ranks.length; rankIndex++) {
        const card = new ABCard(ranks[rankIndex], suits[suitIndex]);
        this.cards.push(card);
      }
    }

    if (mode.includeJokers) {
      const jokers = Array.from({ length: NUM_JOKERS }, () => new ABJoker());
      this.cards.push(...jokers);
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
}
