import { IconType } from 'react-icons';
import { v4 as uuidv4 } from 'uuid';
import { nonStarters } from '../constants/other';
import { jokerIcons } from '../constants/suit-icon';
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
  protected played: boolean = false;
  private discard: boolean = false;
  public readonly starting: boolean;

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
}

export class ABCardPlus extends ABCard {
  declare public rank: Rank;
  declare public suit: Suit;
  declare public letter: Letter;

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
