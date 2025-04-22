import { ABGame } from './game';

interface IABPlayer {
  id: string;
  createdAt: Date;
  games: ABGame[];
}

export class ABPlayer implements IABPlayer {
  readonly id: string;
  readonly createdAt: Date;
  games: ABGame[];

  constructor() {
    this.id = this.toString();
    this.createdAt = new Date();
    this.games = [];
  }

  public addGame(game: ABGame) {
    this.games.push(game);
  }

  public getGames() {
    return this.games;
  }

  public getStreak() {
    return this.games.length;
  }

  private toString(): string {
    return 'player-' + this.createdAt.toISOString();
  }
}
