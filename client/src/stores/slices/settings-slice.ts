import { SettingsState } from '@/types/settings';
import { StateCreator } from 'zustand';

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

export const createSettingsSlice: StateCreator<SettingsState> = (set, get) => ({
  ...initialSettings,
  updateSettings: (settings: Partial<SettingsState>) => {
    set({ ...settings });
  },
  resetSettings: () => {
    set({ ...initialSettings });
  },
  getSettings: () => get(),
});
