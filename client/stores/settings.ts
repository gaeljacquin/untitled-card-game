import { SettingsStore } from 'types/settings';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

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
};

const settingsStore = create(
  persist(
    devtools<SettingsStore>((set, get) => ({
      ...initialSettings,
      updateSettings: (settings) => {
        set({ ...settings });
      },
      resetSettings: () => {
        set({ ...initialSettings });
      },
      getSettings: () => get(),
    })),
    {
      name: 'settings',
    }
  )
);

export default settingsStore;
