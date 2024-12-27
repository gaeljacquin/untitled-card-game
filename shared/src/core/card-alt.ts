import { getRandomIndex } from '../functions/shufflers';
import { alphabetAlt, Letter } from './letter';
import { Rank } from './rank-alt';
import { Suit } from './suit-alt';

interface ICard {
  readonly rank: Rank;
  readonly suit: Suit;
}

export class Card implements ICard {
  protected _rank: Rank;
  protected _suit: Suit;

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
  protected _letter: Letter;
  private _played: boolean = false;
  private _discard: boolean = false;
  private readonly _starting: boolean;

  constructor(letter: Letter, starting: boolean = false) {
    super(Rank.getRankById('A')!, Suit.getSuitById('hearts')!);
    this._letter = letter;
    this._starting = starting;
  }

  get letter(): Letter {
    return this._letter;
  }

  set letter(value: Letter) {
    this._letter = value;
  }

  get starting(): boolean {
    return this._starting;
  }

  get played(): boolean {
    return this._played;
  }

  set played(value: boolean) {
    this._played = value;
  }

  get discard(): boolean {
    return this._discard;
  }

  set discard(value: boolean) {
    this._discard = value;
  }

  public static getRandomLetter(starting: boolean = false): Letter {
    const nonStarters = new Set(['q', 'x', 'y', 'z']);
    const filteredAlphabet = starting
      ? alphabetAlt.filter((letter) => !nonStarters.has(letter))
      : alphabetAlt;

    const randomIndex = getRandomIndex(filteredAlphabet);
    return filteredAlphabet[randomIndex];
  }

  public isVowel(): boolean {
    const vowels = new Set(['a', 'e', 'i', 'o', 'u']);
    return vowels.has(this._letter.toLowerCase());
  }
}

export class ABCardPreview extends ABCard {
  constructor(letter: Letter, starting: boolean = false) {
    super(letter, starting);
  }

  get rank(): Rank {
    return this.rank;
  }

  set rank(value: Rank) {
    this._rank = value;
  }

  get suit(): Suit {
    return this.suit;
  }

  set suit(value: Suit) {
    this._suit = value;
  }

  get letter(): Letter {
    return this._letter;
  }

  set letter(value: Letter) {
    this._letter = value;
  }
}
