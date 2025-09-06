import { StateCreator } from 'zustand';

import { HighScoreState } from '@/types/high-score';
import { SettingsState } from '@/types/settings';

import { MiscState } from './misc-slice';

// Combined store state type
type StoreState = HighScoreState & MiscState & SettingsState;

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

export const createHighScoreSlice: StateCreator<
  StoreState,
  [['zustand/persist', unknown], ['zustand/devtools', never]],
  [],
  HighScoreState
> = (set, get) => ({
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
