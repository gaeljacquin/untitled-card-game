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
  public rank: Rank;
  public suit: Suit;

  constructor(rank: Rank, suit: Suit) {
    this.rank = rank;
    this.suit = suit;
  }

  getRank(): Rank {
    return this.rank;
  }

  getSuit(): Suit {
    return this.suit;
  }

  public static generateRandomCard(): Card {
    const suit = Suit.getRandom();
    const rank = Rank.getRandom();

    return new Card(rank, suit);
  }
}

export class ABCard extends Card {
  public letter: Letter;
  protected played: boolean = false;
  private discard: boolean = false;
  public starting: boolean;

  constructor(starting: boolean = false, joker: boolean = false) {
    const rank = joker ? Rank.setJoker() : Rank.getRandom();
    const suit = joker ? Suit.setJoker() : Suit.getRandom();
    super(rank, suit);
    this.letter = joker ? '*' : this.getRandomLetter(starting)!;
    this.starting = starting;
  }

  getStarting(): boolean {
    return this.starting;
  }

  getPlayed(): boolean {
    return this.played;
  }

  getDiscard(): boolean {
    return this.discard;
  }

  public getLetter(): Letter {
    return this.letter;
  }

  public getRank(): Rank {
    return this.rank;
  }

  public getSuit(): Suit {
    return this.suit;
  }

  setPlayed(value: boolean) {
    this.played = value;
  }

  setDiscard(value: boolean) {
    this.discard = value;
  }

  getRandomLetter(starting: boolean = false): Letter {
    const filteredAlphabet = starting
      ? alphabet.filter((letter) => !nonStarters.has(letter.toLocaleLowerCase()))
      : alphabet;
    const randomIndex = getRandomIndex(filteredAlphabet);

    return filteredAlphabet[randomIndex];
  }

  public isVowel(): boolean {
    return vowels.includes(this.letter.toLocaleLowerCase());
  }

  public _toString(): string {
    return `${this.letter} - ${this.rank.label} of ${this.suit.label}`;
  }
}

export class ABCardPlus extends ABCard {
  constructor(starting: boolean = false) {
    super(starting);
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

export class ABJoker extends ABCard {
  public icon: IconType;
  private playable: boolean = false;

  constructor() {
    super(false, true);
    this.icon = this.getRandomIcon();
  }

  getPlayable(): boolean {
    return this.playable;
  }

  setPlayable(value: boolean) {
    this.playable = value && this.played;
  }

  getRandomIcon(): IconType {
    const randomIndex = getRandomIndex(jokerIcons);

    return jokerIcons[randomIndex];
  }
}
