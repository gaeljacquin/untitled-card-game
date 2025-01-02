import { IconType } from 'react-icons';
import jokerIcons from '../constants/joker-icon';
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
    const suit = Suit.getRandom();
    const rank = Rank.getRandom();

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

  constructor(starting: boolean = false, joker: boolean = false) {
    const rank = joker ? Rank.setJoker() : Rank.getRandom();
    const suit = joker ? Suit.setJoker() : Suit.getRandom();
    super(rank, suit);
    this._letter = joker ? '*' : this.getRandomLetter(starting)!;
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

  public _toString(): string {
    return `${this._letter} - ${this._rank.label} of ${this._suit.label}`;
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

export class ABJoker extends ABCard {
  public icon: IconType;
  public playable: boolean;

  constructor() {
    super(false, true);
    this.icon = this.getRandomIcon();
    this.playable = false;
  }

  setPlayable(value: boolean) {
    this.playable = value && this.played;
  }

  getRandomIcon(): IconType {
    const randomIndex = getRandomIndex(jokerIcons);

    return jokerIcons[randomIndex];
  }
}
