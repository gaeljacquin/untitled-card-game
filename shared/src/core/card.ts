import { v4 as uuidv4 } from 'uuid';
import { getRandomIndex } from '../functions/shufflers';
import { Rank } from './rank';
import { Suit } from './suit';

interface ICard {
  id: string;
  rank: Rank;
  suit: Suit;
}

const vowels = [...'aeiou'];
const consonants = [...'bcdfghjklmnpqrstvwxyz'];
const alphabet = vowels.concat(consonants);

type Letter = (typeof alphabet)[number];

type LetterOptions = 'vowel' | 'consonant' | 'any';

export class Card implements ICard {
  public readonly id: string;
  public readonly rank: Rank;
  public readonly suit: Suit;

  constructor(rank: Rank, suit: Suit) {
    this.id = uuidv4();
    this.rank = rank;
    this.suit = suit;
  }

  getRank(): Rank {
    return this.rank;
  }

  getSuit(): Suit {
    return this.suit;
  }
}

export class ABCard extends Card {
  public readonly letter: Letter;
  public played: boolean = false;
  private discard: boolean = false;
  public faceUp: boolean;

  constructor(
    _rank?: Rank | null,
    _suit?: Suit | null,
    joker: boolean = false,
    letterOption: LetterOptions = 'any',
    faceUp: boolean = true
  ) {
    const rank = joker ? Rank.setJoker() : (_rank ?? Rank.getRandom());
    const suit = joker ? Suit.setJoker() : (_suit ?? Suit.getRandom());
    super(rank, suit);
    this.letter = joker ? '*' : this.getRandomLetter(letterOption)!;
    this.faceUp = faceUp;
  }

  getPlayed(): boolean {
    return this.played;
  }

  getDiscard(): boolean {
    return this.discard;
  }

  getLetter(): Letter {
    return this.letter;
  }

  getRank(): Rank {
    return this.rank;
  }

  getSuit(): Suit {
    return this.suit;
  }

  setPlayed(value: boolean) {
    this.played = value;
  }

  setDiscard(value: boolean) {
    this.discard = value;
  }

  getRandomLetter(letterOption: LetterOptions = 'any'): Letter {
    let letterList;

    switch (letterOption) {
      case 'vowel':
        letterList = vowels;
        break;
      case 'consonant':
        letterList = consonants;
        break;
      case 'any':
        letterList = alphabet;
        break;
      default:
        throw new Error(`Invalid option: ${letterOption}`);
    }

    const randomIndex = getRandomIndex(letterList);

    return letterList[randomIndex];
  }
}

export class ABCardPlus extends ABCard {
  declare public rank: Rank;
  declare public suit: Suit;
  declare public letter: Letter;

  constructor() {
    super();
  }

  getRank(): Rank {
    return this.rank;
  }

  setRank(value: Rank) {
    this.rank = value;
  }

  getSuit(): Suit {
    return this.suit;
  }

  setSuit(value: Suit) {
    this.suit = value;
  }

  getLetter(): Letter {
    return this.letter;
  }

  setLetter(value: Letter) {
    this.letter = value;
  }
}

export type ABCards = ABCard[];
