import { StateCreator } from 'zustand';

import { HighScoreState } from '@/types/high-score';
import { SettingsState } from '@/types/settings';

import { MiscState } from './misc-slice';

// Combined store state type
type StoreState = HighScoreState & MiscState & SettingsState;

export const initialSettings = {
  abDesignIndex: 0,
  previewCard: {
    suit: 'hearts',
    rank: 'ace',
    letter: 'B',
  },
  rankLabel: true,
  rankSwitchLetter: false,
  invertColors: false,
  jokers: false,
};

export const createSettingsSlice: StateCreator<
  StoreState,
  [['zustand/persist', unknown], ['zustand/devtools', never]],
  [],
  SettingsState
> = (set, get) => ({
  ...initialSettings,
  updateSettings: (settings: Partial<SettingsState>) => {
    set({ ...settings });
  },
  resetSettings: () => {
    set({ ...initialSettings });
  },
  getSettings: () => get(),
});
