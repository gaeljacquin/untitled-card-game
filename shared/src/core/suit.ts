import { getRandomIndex } from '@/functions/shuffle';

export type SuitId = 'hearts' | 'spades' | 'diamonds' | 'clubs';

interface ISuit {
  readonly id: SuitId;
  readonly label: string;
  readonly isRed: boolean;
}

export class Suit implements ISuit {
  readonly id: SuitId;
  readonly label: string;
  readonly isRed: boolean;

  private constructor(id: SuitId, label: string, isRed: boolean) {
    this.id = id;
    this.label = label;
    this.isRed = isRed;
  }

  private static readonly suits: Suit[] = [
    new Suit('hearts', 'Hearts', true),
    new Suit('spades', 'Spades', false),
    new Suit('diamonds', 'Diamonds', true),
    new Suit('clubs', 'Clubs', false),
  ];

  public static getById(id: SuitId): Suit {
    const suit = this.suits.find((suit) => suit.id === id);

    if (!suit) {
      throw new Error(`Suit with id ${id} not found`);
    }

    return suit;
  }

  public static getRandom(): Suit {
    const index = getRandomIndex(this.suits);

    return this.suits[index];
  }

  public static getAll(): Suit[] {
    return [...this.suits];
  }

  public static getAllValues() {
    return Object.values(Suit.getAll());
  }
}
