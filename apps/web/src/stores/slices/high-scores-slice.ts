import { StateCreator } from 'zustand';
import { SlugId } from '@untitled-card-game/shared';

import { HighScoreState, HighScoreData, HighScoreObject } from '@/types/high-score';
import { SettingsState } from '@/types/settings';

import { MiscState } from './misc-slice';

// Combined store state type
type StoreState = HighScoreState & MiscState & SettingsState;

export const initialHighScores: HighScoreData = {
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
  setHighScore: (slugId: SlugId, highScore: HighScoreObject) => {
    set({ [slugId]: highScore } as Partial<StoreState>);
  },
  resetHighScore: (slugId: SlugId) => {
    const defaultScore = initialHighScores[slugId as keyof HighScoreData];
    if (defaultScore) {
      set({ [slugId]: defaultScore } as Partial<StoreState>);
    }
  },
  getHighScore: (slugId: SlugId) => {
    const state = get();
    return (state as any)[slugId] || initialHighScores[slugId as keyof HighScoreData] || initialHighScores.four;
  },
});
