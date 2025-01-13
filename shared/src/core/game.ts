import { v4 as uuidv4 } from 'uuid';
import { ABCards } from './card';
import { ABMode } from './mode';

interface IABGame {
  id: string;
  mode: ABMode;
  played: boolean;
  won: boolean;
  createdAt: Date;
}

export class ABGame implements IABGame {
  readonly id: string;
  readonly mode: ABMode;
  public played: boolean;
  public won: boolean;
  public seededCards: ABCards[];
  public dealtABCardGroups: ABCards[];
  public grid: Array<ABCards>;
  public discardedABCards: ABCards;
  readonly createdAt: Date;

  constructor(mode: ABMode) {
    const gridSize = mode.gridSize;
    this.id = uuidv4();
    this.mode = mode;
    this.seededCards = [];
    this.dealtABCardGroups = Array.from({ length: gridSize }, () => Array(gridSize).fill([null]));
    this.grid = Array.from({ length: gridSize }, () => Array(gridSize).fill([null]));
    this.discardedABCards = [];
    this.played = false;
    this.won = false;
    this.createdAt = new Date();
  }

  public setSeededCards(cards: ABCards[]) {
    this.seededCards = cards;
  }

  public setPlayed() {
    this.played = true;
  }

  public setWon() {
    this.won = true;
  }

  public dealHand(index: number) {
    const abCardGroup = this.seededCards[index];
    this.dealtABCardGroups[index] = abCardGroup;

    return abCardGroup;
  }
}
