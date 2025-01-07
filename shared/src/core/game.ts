import { v4 as uuidv4 } from 'uuid';
import { ABCards } from './card';
import { ABMode } from './mode';
import { ABSeed } from './seed';

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
  public groupedABCards: Array<ABCards>;
  public dealtABCardGroups: Array<ABCards>;
  public grid: Array<ABCards>;
  public discardedABCards: ABCards;
  readonly createdAt: Date;

  constructor(mode: ABMode) {
    const seed = new ABSeed(mode);
    const gridSize = mode.gridSize;
    this.id = uuidv4();
    this.mode = mode;
    this.groupedABCards = seed.groupedABCards;
    this.dealtABCardGroups = [];
    this.discardedABCards = [];
    this.grid = Array.from({ length: gridSize }, () => Array(gridSize).fill([null]));
    this.played = false;
    this.won = false;
    this.createdAt = new Date();
  }

  public setPlayed() {
    this.played = true;
  }

  public setWon() {
    this.won = true;
  }
}
