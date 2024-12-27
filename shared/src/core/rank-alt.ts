type RankId = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

interface IRank {
  readonly value: number;
  readonly id: RankId;
  readonly label: string;
  readonly labelFull: string;
}

export class Rank implements IRank {
  readonly value: number;
  readonly id: RankId;
  readonly label: string;
  readonly labelFull: string;

  private constructor(value: number, id: RankId, label: string, labelFull: string) {
    this.value = value;
    this.id = id;
    this.label = label;
    this.labelFull = labelFull;
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

  public static getRankById(id: RankId): Rank | undefined {
    return this.ranks.find((rank) => rank.id === id);
  }

  public static getRandomRank(): Rank {
    const index = Math.floor(Math.random() * this.ranks.length);
    return this.ranks[index];
  }

  public static getAllRanks(): Rank[] {
    return [...this.ranks];
  }
}
