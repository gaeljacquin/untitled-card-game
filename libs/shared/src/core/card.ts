import { Rank } from './rank';
import { Suit } from './suit';

interface ICard {
  id: string;
  rank: Rank;
  suit: Suit;
}

// Functional factory for creating card objects
const createCard = (rank: Rank, suit: Suit): ICard => {
  const cardToString = (): string => 'card-' + rank.value + ' of ' + suit.label;

  return {
    id: cardToString(),
    rank,
    suit,
  };
};

export class Card implements ICard {
  public readonly id: string;
  public readonly rank: Rank;
  public readonly suit: Suit;

  constructor(rank: Rank, suit: Suit) {
    // Use functional factory internally
    const card = createCard(rank, suit);

    this.rank = card.rank;
    this.suit = card.suit;
    this.id = card.id;
  }

  getRank(): Rank {
    return this.rank;
  }

  getSuit(): Suit {
    return this.suit;
  }

  protected toString(): string {
    return 'card-' + this.rank.value + ' of ' + this.suit.label;
  }
}

// Functional factory for creating ABCard objects
const createABCard = (
  rank: Rank | null | undefined,
  suit: Suit | null | undefined,
  faceUp: boolean = true,
  played: boolean = false,
  discard: boolean = false
) => {
  const actualRank = rank ?? Rank.getRandom();
  const actualSuit = suit ?? Suit.getRandom();
  const card = createCard(actualRank, actualSuit);

  return {
    ...card,
    played,
    discard,
    faceUp,
    _toString: () => 'card-' + actualRank.value + ' of ' + actualSuit.label,
  };
};

export class ABCard extends Card {
  public played: boolean = false;
  private discard: boolean = false;
  public faceUp: boolean;

  constructor(_rank?: Rank | null, _suit?: Suit | null, faceUp: boolean = true) {
    const rank = _rank ?? Rank.getRandom();
    const suit = _suit ?? Suit.getRandom();
    super(rank, suit);
    this.faceUp = faceUp;
  }

  getPlayed(): boolean {
    return this.played;
  }

  getDiscard(): boolean {
    return this.discard;
  }

  setPlayed(value: boolean) {
    this.played = value;
  }

  setDiscard(value: boolean) {
    this.discard = value;
  }

  _toString() {
    return this.toString(); // Use the inherited toString method
  }
}

// Functional factory for ABCardPreview
const createABCardPreview = (rank?: Rank, suit?: Suit) => {
  const actualRank = rank ?? Rank.getRandom();
  const actualSuit = suit ?? Suit.getRandom();

  return createABCard(actualRank, actualSuit, true, false, false);
};

export class ABCardPreview extends ABCard {
  declare public rank: Rank;
  declare public suit: Suit;

  constructor() {
    super();
  }

  override getRank(): Rank {
    return this.rank;
  }

  setRank(value: Rank) {
    this.rank = value;
  }

  override getSuit(): Suit {
    return this.suit;
  }

  setSuit(value: Suit) {
    this.suit = value;
  }
}

export type ABCards = ABCard[];
