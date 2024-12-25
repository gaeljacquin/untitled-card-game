import { mainQuestList } from '../constants/main-quest';
import { numSideQuests, sideQuestList } from '../constants/side-quest';
import shuffler from '../functions/shuffler';
import { MainQuest, SideQuest } from './quest';
import { Timer } from './timer';
import { ABWord } from './word';

interface Game {
  timer: Timer;
  createdAt: Date;
}

export class ABGame implements Game {
  timer: Timer;
  createdAt: Date;
  abWords: ABWord[];
  mainQuest: MainQuest;
  sideQuests: SideQuest[];

  constructor(timer: Timer) {
    this.timer = timer;
    this.abWords = [];
    this.createdAt = new Date();
    this.mainQuest = this.setMainQuest();
    this.sideQuests = this.setSideQuests();
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
}
