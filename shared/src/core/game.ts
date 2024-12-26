import { mainQuestList } from '../constants/main-quest';
import { numSideQuests, sideQuestList } from '../constants/side-quest';
import { shuffler } from '../functions/shufflers';
import { MainQuest, SideQuest } from './quest';
import { Timer } from './timer';
import { ABWord } from './word';

export type PlayedWordPlain = {
  word: string;
  valid: boolean;
};

interface Game {
  timer: Timer;
  createdAt: Date;
  played: boolean;
  won: boolean;
}

export class ABGame implements Game {
  timer: Timer;
  createdAt: Date;
  played: boolean;
  won: boolean;
  abWords: ABWord[];
  mainQuest: MainQuest;
  sideQuests: SideQuest[];
  score: number;

  constructor(timer: Timer) {
    this.timer = timer;
    this.abWords = [];
    this.played = false;
    this.won = false;
    this.createdAt = new Date();
    this.mainQuest = this.setMainQuest();
    this.sideQuests = this.setSideQuests();
    this.score = 0;
  }

  setMainQuest() {
    const randomIndex = Math.floor(Math.random() * mainQuestList.length);
    const randomMainQuest = mainQuestList[randomIndex];
    const mainQuest = new MainQuest(randomMainQuest);

    return mainQuest;
  }

  setSideQuests() {
    const shuffled = shuffler(sideQuestList).slice(0, numSideQuests) as SideQuest[];
    const sideQuests = shuffled.map((item: SideQuest) => {
      return new SideQuest(item);
    });

    return sideQuests;
  }

  addABWord(word: ABWord) {
    this.abWords.push(word);
  }

  getValidWords() {
    return this.abWords.filter((word) => word.valid);
  }

  getInvalidWords() {
    return this.abWords.filter((word) => !word.valid);
  }

  getPlayedWordsPlain(): PlayedWordPlain[] {
    return this.abWords.map((word) => {
      return {
        word: word.join(''),
        valid: word.valid,
      };
    });
  }
}
