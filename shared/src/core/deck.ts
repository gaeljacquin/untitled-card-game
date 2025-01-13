// import { ABCard, ABCards, ABJoker } from './card';
import { ABCard, ABCards } from './card';
import { Rank } from './rank';
import { Suit } from './suit';

// const NUM_JOKERS = 2;

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

    // const jokers = Array.from({ length: NUM_JOKERS }, () => new ABJoker());
    // this.cards.push(...jokers);

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
