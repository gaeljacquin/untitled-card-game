import { HighScoreState } from 'types/high-score';
import { StateCreator } from 'zustand';

export const initialHighScores = {
  four: {
    value: 0,
    date: new Date(),
    gameState: [],
  },

  five: {
    value: 0,
    date: new Date(),
    gameState: [],
  },
};

export const createHighScoreSlice: StateCreator<HighScoreState> = (set, get) => ({
  ...initialHighScores,
  setHighScore: (slugId, highScore) => {
    set({ [slugId]: highScore });
  },
  resetHighScore: (slugId) => {
    set({ [slugId]: initialHighScores[slugId] });
  },
  getHighScore: (slugId) => {
    return get()[slugId];
  },
});
