import { IABGridCell, SlugId } from '@gaeljacquin/ucg-shared';

type HighScoreObject = {
  value: number;
  date: Date;
  gameState: IABGridCell[][];
};

type HighScoreMap = {
  [key in SlugId]: HighScoreObject;
};

export interface HighScoreStore extends HighScoreMap {
  setHighScore: (arg0: SlugId, arg1: HighScoreObject) => void;
  resetHighScore: (arg0: SlugId) => void;
  getHighScore: (arg0: SlugId) => HighScoreObject;
}
