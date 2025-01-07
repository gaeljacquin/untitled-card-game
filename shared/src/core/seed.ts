import { shuffler } from '../functions/shufflers';
import { ABCard, ABCards } from './card';
import { ABMode, IABModeType } from './mode';
import { Rank } from './rank';
import { Suit } from './suit';

interface IABSeed {
  readonly groupedABCards: Array<ABCards>;
}

export class ABSeed implements IABSeed {
  public readonly groupedABCards: Array<ABCards>;

  constructor(mode: ABMode) {
    const type = mode.type;
    const gridSize = mode.gridSize;
    const abCardsPerDeal = mode.gridSize + 1;
    this.groupedABCards = this.getABCards(type, gridSize, abCardsPerDeal);
  }

  private getABCards(type: IABModeType, gridSize: number, numCards: number) {
    let result: Array<ABCards>;

    switch (type) {
      case 'abpoker':
        const seed = this.generateABPokerSeed(numCards);
        result = this.generateABPokerCards(seed, gridSize, numCards);
        break;
      case 'abword':
        result = this.generateABWordCards(gridSize, numCards);
        break;
      default:
        throw new Error(`Invalid mode type: ${type}`);
    }

    return result;
  }

  private generateABPokerSeed(numCards: number) {
    const ranks = Rank.getAll().sort((a, b) => a.value - b.value);
    const startIndex = Math.floor(Math.random() * (ranks.length - numCards + 1));
    const continuousRanks = ranks.slice(startIndex, startIndex + numCards);
    const minValue = continuousRanks[0].value;
    const maxValue = continuousRanks[continuousRanks.length - 1].value;
    let decoyRank: Rank | null = null;

    if (minValue > ranks[0].value) {
      decoyRank =
        ranks.find((rank) => rank.value === minValue - 1 || rank.value === minValue - 2) ?? null;
    }

    if (!decoyRank && maxValue < ranks[ranks.length - 1].value) {
      decoyRank =
        ranks.find((rank) => rank.value === maxValue + 1 || rank.value === maxValue + 2) ?? null;
    }

    if (decoyRank) {
      continuousRanks.push(decoyRank);
    }

    return continuousRanks;
  }

  private generateABPokerCards(seed: Rank[], gridSize: number, numCards: number) {
    const cards: ABCards = [];

    for (const rank of seed) {
      for (let i = 0; i < numCards; i++) {
        const suit = Suit.getRandom();
        cards.push(new ABCard(rank, suit, false));
      }
    }

    const shuffledCards = shuffler(cards) as ABCards;
    const result: ABCards[] = [];

    for (let i = 0; i < gridSize; i++) {
      result.push(shuffledCards.slice(i * numCards, (i + 1) * numCards));
    }

    return result;
  }

  private generateABWordCards(gridSize: number, numCards: number) {
    const total = numCards * gridSize;
    const randomVowelCards = Array.from(
      { length: numCards },
      () => new ABCard(null, null, false, 'vowel')
    );
    const randomCards = Array.from(
      { length: total - numCards },
      () => new ABCard(null, null, false, 'any')
    );
    const cards = randomVowelCards.concat(randomCards);
    const shuffledCards = shuffler(cards) as ABCards;
    const result: ABCards[] = [];

    for (let i = 0; i < numCards; i++) {
      result.push(shuffledCards.slice(i * gridSize, (i + 1) * gridSize));
    }

    return result;
  }
}
