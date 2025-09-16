import { IABGridCell, SlugId } from '@untitled-card-game/shared';

export type HighScoreObject = {
  value: number;
  date: Date;
  gameState: IABGridCell[][];
};

export interface HighScoreData {
  four: HighScoreObject;
  five: HighScoreObject;
  classic?: HighScoreObject;
}

export interface HighScoreActions {
  setHighScore: (slugId: SlugId, highScore: HighScoreObject) => void;
  resetHighScore: (slugId: SlugId) => void;
  getHighScore: (slugId: SlugId) => HighScoreObject;
}

export type HighScoreState = HighScoreData & HighScoreActions;
