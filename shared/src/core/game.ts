import { v4 as uuidv4 } from 'uuid';
import { ABCards } from '@/core/card';
import { ABMode } from '@/core/mode';

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
  public abSeed: ABCards[];
  public abDeals: ABCards[];
  public grid: ABCards[];
  public abDiscards: ABCards;
  readonly createdAt: Date;

  constructor(mode: ABMode) {
    const gridSize = mode.gridSize;
    this.id = uuidv4();
    this.mode = mode;
    this.abSeed = [];
    this.abDeals = Array.from({ length: gridSize }, () => Array(gridSize).fill([null]));
    this.grid = Array.from({ length: gridSize }, () => Array(gridSize).fill([null]));
    this.abDiscards = [];
    this.played = false;
    this.won = false;
    this.createdAt = new Date();
  }

  public setABSeed(cards: ABCards[]) {
    this.abSeed = cards;
  }

  public setPlayed() {
    this.played = true;
  }

  public setWon() {
    this.won = true;
  }

  public dealHand(index: number) {
    const abCardGroup = this.abSeed[index];
    this.abDeals[index] = abCardGroup;

    return abCardGroup;
  }

  public _toStringGrid(): string[][] {
    const abSeed = this.abSeed;

    return abSeed.map((deal) => {
      return deal.map((card) => {
        return card._toString();
      });
    });
  }
}
