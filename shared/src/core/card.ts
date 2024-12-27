import { nonStarters } from '../constants/other';
import { getRandomIndex } from '../functions/shufflers';
import { Rank } from './rank';
import { Suit } from './suit';

interface ICard {
  readonly rank: Rank;
  readonly suit: Suit;
}

const vowels = [...'aeiou'];
const consonants = [...'bcdfghjklmnpqrstvwxyz'];
const alphabet = vowels.concat(consonants);

type Letter = (typeof alphabet)[number];

export class Card implements ICard {
  public _rank: Rank;
  public _suit: Suit;

  constructor(rank: Rank, suit: Suit) {
    this._rank = rank;
    this._suit = suit;
  }

  get rank(): Rank {
    return this._rank;
  }

  get suit(): Suit {
    return this._suit;
  }

  public static generateRandomCard(): Card {
    const suit = Suit.getRandomSuit();
    const rank = Rank.getRandomRank();

    return new Card(rank, suit);
  }
}

interface IABCard extends ICard {
  readonly letter: Letter;
  played: boolean;
  discard: boolean;
  readonly starting: boolean;
}

export class ABCard extends Card implements IABCard {
  public _letter: Letter;
  private _played: boolean = false;
  private _discard: boolean = false;
  private readonly _starting: boolean;

  constructor(starting: boolean = false) {
    super(Rank.getRankById('ace')!, Suit.getSuitById('hearts')!);
    const randomRank = Rank.getRandomRank();
    const randomSuit = Suit.getRandomSuit();
    this._rank = randomRank;
    this._suit = randomSuit;
    this._letter = this.getRandomLetter(starting)!;
    this._starting = starting;
  }

  getStarting(): boolean {
    return this._starting;
  }

  getPlayed(): boolean {
    return this._played;
  }

  getDiscard(): boolean {
    return this._discard;
  }

  public getLetter(): Letter {
    return this._letter;
  }

  public getRank(): Rank {
    return this._rank;
  }

  public getSuit(): Suit {
    return this._suit;
  }

  set letter(value: Letter) {
    this._letter = value;
  }

  set starting(value: boolean) {
    this.starting = value;
  }

  set played(value: boolean) {
    this._played = value;
  }

  set discard(value: boolean) {
    this._discard = value;
  }

  getRandomLetter(starting: boolean = false): Letter {
    const filteredAlphabet = starting
      ? alphabet.filter((letter) => !nonStarters.has(letter.toLocaleLowerCase()))
      : alphabet;

    const randomIndex = getRandomIndex(filteredAlphabet);

    return filteredAlphabet[randomIndex];
  }

  public isVowel(): boolean {
    return vowels.includes(this._letter.toLocaleLowerCase());
  }
}

export class ABCardPreview extends ABCard {
  constructor() {
    super(false);
  }

  getRank(): Rank {
    return this.rank;
  }

  setRank(value: Rank) {
    this._rank = value;
  }

  getSuit(): Suit {
    return this.suit;
  }

  setSuit(value: Suit) {
    this._suit = value;
  }

  getLetter(): Letter {
    return this._letter;
  }

  setLetter(value: Letter) {
    this._letter = value;
  }
}
