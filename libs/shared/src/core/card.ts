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
  protected _rank: Rank;
  protected _suit: Suit;

  constructor(rank: Rank, suit: Suit) {
    // Use functional factory internally
    const card = createCard(rank, suit);

    this._rank = card.rank;
    this._suit = card.suit;
    this.id = card.id;
  }

  get rank(): Rank {
    return this._rank;
  }

  get suit(): Suit {
    return this._suit;
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


export class ABCard extends Card {
  public played: boolean = false;
  private discard: boolean = false;
  public faceUp: boolean;
  private _isJoker: boolean;
  private _baseRank: Rank;
  private _baseSuit: Suit;
  protected _currentRank: Rank;
  protected _currentSuit: Suit;

  constructor(_rank?: Rank | null, _suit?: Suit | null, faceUp: boolean = true) {
    const rank = _rank ?? Rank.getRandom();
    const suit = _suit ?? Suit.getRandom();
    super(rank, suit);
    this.faceUp = faceUp;
    this._isJoker = rank.isJoker;
    this._baseRank = rank;
    this._baseSuit = suit;
    this._currentRank = rank;
    this._currentSuit = suit;
  }

  override get rank(): Rank {
    return this._currentRank;
  }

  override get suit(): Suit {
    return this._currentSuit;
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

  isJoker(): boolean {
    return this._isJoker;
  }

  getBaseRank(): Rank {
    return this._baseRank;
  }

  getBaseSuit(): Suit {
    return this._baseSuit;
  }

  setJokerValue(rank: Rank, suit: Suit) {
    if (!this._isJoker) {
      throw new Error('Cannot set joker value on non-joker card');
    }
    this._currentRank = rank;
    this._currentSuit = suit;
  }

  resetJokerValue() {
    if (!this._isJoker) {
      throw new Error('Cannot reset joker value on non-joker card');
    }
    this._currentRank = this._baseRank;
    this._currentSuit = this._baseSuit;
  }

  _toString() {
    return this.toString(); // Use the inherited toString method
  }
}


export class ABCardPreview extends ABCard {
  private _previewRank: Rank;
  private _previewSuit: Suit;

  constructor() {
    super();
    this._previewRank = this._currentRank;
    this._previewSuit = this._currentSuit;
  }

  override get rank(): Rank {
    return this._previewRank;
  }

  override get suit(): Suit {
    return this._previewSuit;
  }

  override getRank(): Rank {
    return this.rank;
  }

  setRank(value: Rank) {
    this._previewRank = value;
  }

  override getSuit(): Suit {
    return this.suit;
  }

  setSuit(value: Suit) {
    this._previewSuit = value;
  }
}

export type ABCards = ABCard[];
