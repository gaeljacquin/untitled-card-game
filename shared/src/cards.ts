// Card-related classes and utilities

import type { SuitType, SuitId, RankType, RankId } from './types';

export class Suit {
  constructor(
    public id: SuitId,
    public name: string,
    public symbol: string,
    public color: string
  ) {}

  static getAllValues(): SuitType[] {
    return [
      { id: 'hearts', name: 'Hearts', symbol: '♥', color: 'red', isRed: true, label: 'Hearts' },
      { id: 'diamonds', name: 'Diamonds', symbol: '♦', color: 'red', isRed: true, label: 'Diamonds' },
      { id: 'clubs', name: 'Clubs', symbol: '♣', color: 'black', isRed: false, label: 'Clubs' },
      { id: 'spades', name: 'Spades', symbol: '♠', color: 'black', isRed: false, label: 'Spades' }
    ];
  }

  static getById(id: SuitId): SuitType | undefined {
    return this.getAllValues().find(suit => suit.id === id);
  }
}

export class Rank {
  constructor(
    public id: RankId,
    public name: string,
    public value: number,
    public symbol: string
  ) {}

  static getAllValues(): RankType[] {
    return [
      { id: 'ace', name: 'Ace', value: 1, symbol: 'A', label: 'Ace' },
      { id: 'two', name: 'Two', value: 2, symbol: '2', label: 'Two' },
      { id: 'three', name: 'Three', value: 3, symbol: '3', label: 'Three' },
      { id: 'four', name: 'Four', value: 4, symbol: '4', label: 'Four' },
      { id: 'five', name: 'Five', value: 5, symbol: '5', label: 'Five' },
      { id: 'six', name: 'Six', value: 6, symbol: '6', label: 'Six' },
      { id: 'seven', name: 'Seven', value: 7, symbol: '7', label: 'Seven' },
      { id: 'eight', name: 'Eight', value: 8, symbol: '8', label: 'Eight' },
      { id: 'nine', name: 'Nine', value: 9, symbol: '9', label: 'Nine' },
      { id: 'ten', name: 'Ten', value: 10, symbol: '10', label: 'Ten' },
      { id: 'jack', name: 'Jack', value: 11, symbol: 'J', label: 'Jack' },
      { id: 'queen', name: 'Queen', value: 12, symbol: 'Q', label: 'Queen' },
      { id: 'king', name: 'King', value: 13, symbol: 'K', label: 'King' }
    ];
  }

  static getById(id: RankId): RankType | undefined {
    return this.getAllValues().find(rank => rank.id === id);
  }
}

export class ABCardPreview {
  private rank?: RankType;
  private suit?: SuitType;
  public letter?: string;

  constructor() {
    // Initialize with default values if needed
  }

  setRank(rank?: RankType): void {
    this.rank = rank;
  }

  setSuit(suit?: SuitType): void {
    this.suit = suit;
  }

  getRank(): RankType | undefined {
    return this.rank;
  }

  getSuit(): SuitType | undefined {
    return this.suit;
  }

  setLetter(letter: string): void {
    this.letter = letter;
  }

  getLetter(): string | undefined {
    return this.letter;
  }
}
