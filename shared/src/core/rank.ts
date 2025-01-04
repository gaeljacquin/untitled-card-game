import { getRandomIndex } from '../functions/shufflers';

export type RankId =
  | 'ace'
  | 'two'
  | 'three'
  | 'four'
  | 'five'
  | 'six'
  | 'seven'
  | 'eight'
  | 'nine'
  | 'ten'
  | 'jack'
  | 'queen'
  | 'king';

type JokerRank = 'joker';

interface IRank {
  readonly value: number;
  readonly id: RankId | JokerRank;
  readonly label: string;
  readonly labelFull: string;
  readonly aceFace: boolean;
}

export class Rank implements IRank {
  readonly value: number;
  readonly id: RankId | JokerRank;
  readonly label: string;
  readonly labelFull: string;
  readonly aceFace: boolean;

  private constructor(value: number, label: string, id: RankId | JokerRank, labelFull: string) {
    this.value = value;
    this.label = label;
    this.id = id;
    this.labelFull = labelFull;
    this.aceFace = ['ace', 'jack', 'queen', 'king'].includes(id);
  }

  private static readonly ranks: Rank[] = [
    new Rank(1, 'A', 'ace', 'Ace'),
    new Rank(2, '2', 'two', 'Two'),
    new Rank(3, '3', 'three', 'Three'),
    new Rank(4, '4', 'four', 'Four'),
    new Rank(5, '5', 'five', 'Five'),
    new Rank(6, '6', 'six', 'Six'),
    new Rank(7, '7', 'seven', 'Seven'),
    new Rank(8, '8', 'eight', 'Eight'),
    new Rank(9, '9', 'nine', 'Nine'),
    new Rank(10, '10', 'ten', 'Ten'),
    new Rank(11, 'J', 'jack', 'Jack'),
    new Rank(12, 'Q', 'queen', 'Queen'),
    new Rank(13, 'K', 'king', 'King'),
  ];

  public static getById(id: RankId): Rank {
    const rank = this.ranks.find((rank) => rank.id === id);

    if (!rank) {
      throw new Error(`Rank with id ${id} not found`);
    }

    return rank;
  }

  public static getRandom(): Rank {
    const index = getRandomIndex(this.ranks);
    return this.ranks[index];
  }

  public static getAll(): Rank[] {
    return [...this.ranks];
  }

  public static getAllValues() {
    return Object.values(Rank.getAll());
  }

  public static setJoker(): Rank {
    return new Rank(-1, '?', 'joker', 'Joker');
  }
}
