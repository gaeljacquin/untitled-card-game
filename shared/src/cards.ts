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
      { id: 'hearts', name: 'Hearts', symbol: '♥', color: 'red' },
      { id: 'diamonds', name: 'Diamonds', symbol: '♦', color: 'red' },
      { id: 'clubs', name: 'Clubs', symbol: '♣', color: 'black' },
      { id: 'spades', name: 'Spades', symbol: '♠', color: 'black' }
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
      { id: 'ace', name: 'Ace', value: 1, symbol: 'A' },
      { id: 'two', name: 'Two', value: 2, symbol: '2' },
      { id: 'three', name: 'Three', value: 3, symbol: '3' },
      { id: 'four', name: 'Four', value: 4, symbol: '4' },
      { id: 'five', name: 'Five', value: 5, symbol: '5' },
      { id: 'six', name: 'Six', value: 6, symbol: '6' },
      { id: 'seven', name: 'Seven', value: 7, symbol: '7' },
      { id: 'eight', name: 'Eight', value: 8, symbol: '8' },
      { id: 'nine', name: 'Nine', value: 9, symbol: '9' },
      { id: 'ten', name: 'Ten', value: 10, symbol: '10' },
      { id: 'jack', name: 'Jack', value: 11, symbol: 'J' },
      { id: 'queen', name: 'Queen', value: 12, symbol: 'Q' },
      { id: 'king', name: 'King', value: 13, symbol: 'K' }
    ];
  }

  static getById(id: RankId): RankType | undefined {
    return this.getAllValues().find(rank => rank.id === id);
  }
}