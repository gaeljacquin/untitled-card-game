import { alphabet, ranks, suits } from '../constants/card';
import { getRandomIndex } from '../functions/shufflers';
import { Letter } from './letter';
import { Rank } from './rank';
import { Suit } from './suit';

export interface Card {
  rank: Rank;
  suit: Suit;
  letter: Letter;
  played?: boolean;
  discard?: boolean;
  starting?: boolean;
}

export class ABCard implements Card {
  rank: Rank;
  suit: Suit;
  letter: Letter;
  played: boolean = false;
  discard: boolean = false;
  starting: boolean;
  // joker: boolean = false;

  constructor(starting: boolean = false, rank?: Rank, suit?: Suit, letter?: Letter) {
    this.starting = starting;
    this.rank = rank ?? this.getRandomRankOrSuit(ranks);
    this.suit = suit ?? this.getRandomRankOrSuit(suits);
    this.letter = letter ?? this.getRandomLetter();
  }

  setPlayed() {
    this.played = true;
  }

  setDiscard() {
    this.discard = true;
  }

  getRandomRankOrSuit<T>(records: Record<string, T>): T {
    const keys = Object.keys(records);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    return records[randomKey];
  }

  getRandomLetter() {
    const nonStarters = ['q', 'x', 'y', 'z'];
    let filteredAlphabet = alphabet;

    if (this.starting) {
      filteredAlphabet = alphabet.filter((letter) => !nonStarters.includes(letter));
    }

    const randomIndex = getRandomIndex(filteredAlphabet);
    const randomLetter = alphabet[randomIndex];

    return randomLetter;
  }

  isVowel() {
    return (
      this.letter.toLowerCase() === 'a' ||
      this.letter.toLowerCase() === 'e' ||
      this.letter.toLowerCase() === 'i' ||
      this.letter.toLowerCase() === 'o' ||
      this.letter.toLowerCase() === 'u'
    );
  }
}

export default ABCard;
