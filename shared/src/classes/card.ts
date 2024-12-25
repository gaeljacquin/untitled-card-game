import { Card } from "../interfaces/card";
import { Letter } from "../types/letter";
import { Rank } from "../types/rank";
import { Suit } from "../types/suit";
import { alphabet, ranks, suits } from "../constants/card";

export class ABCard implements Card {
  rank: Rank;
  suit: Suit;
  letter: Letter;
  played: boolean = false;
  discard: boolean = false;
  starting: boolean = false;
  // joker: boolean = false;

  constructor() {
    this.rank = this.getRandomRankOrSuit(ranks);
    this.suit = this.getRandomRankOrSuit(suits);
    this.letter = this.getRandomLetter();
  }

  setStarting() {
    this.starting = true;
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
    const randomIndex = Math.floor(Math.random() * alphabet.length);

    return alphabet[randomIndex];
  }
}

export default ABCard;
