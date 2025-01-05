import { v4 as uuidv4 } from 'uuid';
import { ABWord } from './word';

interface IABGame {
  id: string;
  createdAt: Date;
  played: boolean;
  won: boolean;
}

export class ABGame implements IABGame {
  readonly id: string;
  readonly createdAt: Date;
  public played: boolean;
  public won: boolean;
  private discards: number;
  private words: ABWord[];
  public score: number;

  constructor() {
    this.id = uuidv4();
    this.createdAt = new Date();
    this.words = [];
    this.played = false;
    this.won = false;
    this.discards = 0;
    this.score = 0;
  }

  public setPlayed() {
    this.played = true;
  }

  public addWord(word: ABWord) {
    this.words.push(word);
  }

  public getWords() {
    const validWords = [];
    const invalidWords = [];

    for (const word of this.words) {
      if (word.getValid()) {
        validWords.push(word);
      } else {
        invalidWords.push(word);
      }
    }

    return { validWords, invalidWords };
  }

  public getScore() {
    return this.score;
  }

  public setScore(score: number) {
    this.score = score;
  }

  public getDiscards() {
    return this.discards;
  }

  public setDiscards(discards: number) {
    this.discards = discards;
  }
}
