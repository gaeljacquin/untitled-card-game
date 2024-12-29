import { getRandomIndex } from '../functions/shufflers';

export type SuitId = 'hearts' | 'spades' | 'diamonds' | 'clubs';

type SuitSign = '♥' | '♠' | '♦' | '♣';

interface ISuit {
  readonly sign: SuitSign;
  readonly id: SuitId;
  readonly label: string;
  readonly isRed: boolean;
}

export class Suit implements ISuit {
  readonly sign: SuitSign;
  readonly id: SuitId;
  readonly label: string;
  readonly isRed: boolean;

  private constructor(sign: SuitSign, id: SuitId, label: string, isRed: boolean) {
    this.sign = sign;
    this.id = id;
    this.label = label;
    this.isRed = isRed;
  }

  private static readonly suits: Suit[] = [
    new Suit('♥', 'hearts', 'Hearts', true),
    new Suit('♠', 'spades', 'Spades', false),
    new Suit('♦', 'diamonds', 'Diamonds', true),
    new Suit('♣', 'clubs', 'Clubs', false),
  ];

  public static getSuitById(id: SuitId): Suit {
    const suit = this.suits.find((suit) => suit.id === id);

    if (!suit) {
      throw new Error(`Suit with id ${id} not found`);
    }

    return suit;
  }

  public static getRandomSuit(): Suit {
    const index = getRandomIndex(this.suits);

    return this.suits[index];
  }

  public static getAllSuits(): Suit[] {
    return [...this.suits];
  }
}
