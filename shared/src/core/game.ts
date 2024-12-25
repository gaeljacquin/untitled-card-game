import { mainQuestList } from "../constants/main-quest";
import { MainQuest, SideQuest } from "./quest";
import { ABWord } from "./word";
import shuffler from "../functions/shuffler";
import { numSideQuests, sideQuestList } from "../constants/side-quest";

interface Game {
  timer: number;
  createdAt: Date;
}

export class ABGame implements Game {
  timer: number;
  createdAt: Date;
  abWords: ABWord[];
  mainQuest: MainQuest;
  sideQuests: SideQuest[];

  constructor(timer: number) {
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
    const shuffled = shuffler(sideQuestList).slice(0, numSideQuests);

    const sideQuests = shuffled.map((item: SideQuest) => {
      return new SideQuest(item);
    });

    return sideQuests;
  }

  addABWord(word: ABWord) {
    this.abWords.push(word);
  }
}
