type Sign = '♥' | '♠' | '♦' | '♣';
type Id = 'hearts' | 'spades' | 'diamonds' | 'clubs';

interface ISuit {
  readonly sign: Sign;
  readonly id: Id;
  readonly label: string;
  readonly isRed: boolean;
}

export class Suit implements ISuit {
  readonly sign: Sign;
  readonly id: Id;
  readonly label: string;
  readonly isRed: boolean;

  private constructor(sign: Sign, id: Id, label: string, isRed: boolean) {
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

  public static getSuitById(id: Id): Suit | undefined {
    return this.suits.find((suit) => suit.id === id);
  }

  public static getRandomSuit(): Suit {
    const index = Math.floor(Math.random() * this.suits.length);
    return this.suits[index];
  }

  public static getAllSuits(): Suit[] {
    return [...this.suits];
  }
}
