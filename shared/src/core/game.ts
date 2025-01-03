import { v4 as uuidv4 } from 'uuid';
import { mainQuestList } from '@/constants/main-quest';
import { numSideQuests, sideQuestList } from '@/constants/side-quest';
import { ABMainQuest, ABSideQuest } from '@/core/quest';
import { Timer } from '@/core/timer';
import { ABWord } from '@/core/word';
import { getRandomIndex, shuffler } from '@/functions/shufflers';

interface IABGame {
  id: string;
  createdAt: Date;
  timer: Timer;
  played: boolean;
  won: boolean;
}

export class ABGame implements IABGame {
  readonly id: string;
  readonly createdAt: Date;
  readonly timer: Timer;
  public played: boolean;
  public won: boolean;
  private discards: number;
  private words: ABWord[];
  private readonly mainQuest: ABMainQuest;
  private readonly sideQuests: ABSideQuest[];
  public score: number;

  constructor(timer: Timer) {
    this.id = uuidv4();
    this.createdAt = new Date();
    this.timer = timer;
    this.words = [];
    this.played = false;
    this.won = false;
    this.discards = 0;
    this.mainQuest = this.setMainQuest();
    this.sideQuests = this.setSideQuests();
    this.score = 0;
  }

  public getMainQuest() {
    return this.mainQuest;
  }

  setMainQuest() {
    const randomIndex = getRandomIndex(mainQuestList);
    const randomMainQuest = mainQuestList[randomIndex];
    const mainQuest = new ABMainQuest(randomMainQuest);

    return mainQuest;
  }

  public getSideQuests() {
    return this.sideQuests;
  }

  setSideQuests() {
    const shuffled = shuffler(sideQuestList).slice(0, numSideQuests) as ABSideQuest[];
    const sideQuests = shuffled.map((item: ABSideQuest) => {
      return new ABSideQuest(item);
    });

    return sideQuests;
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

  public getTimer() {
    return this.timer;
  }

  public getDiscards() {
    return this.discards;
  }

  public setDiscards(discards: number) {
    this.discards = discards;
  }
}
