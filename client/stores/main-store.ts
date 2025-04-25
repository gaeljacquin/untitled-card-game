import { createHighScoreSlice } from 'stores/slices/high-scores-slice';
import { createMiscSlice, MiscState } from 'stores/slices/misc-slice';
import { createSettingsSlice } from 'stores/slices/settings-slice';
import { HighScoreState } from 'types/high-score';
import { SettingsState } from 'types/settings';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type StoreState = HighScoreState & MiscState & SettingsState;

export const useUcgStore = create<StoreState>()(
  persist(
    devtools((set, get, store) => ({
      ...createHighScoreSlice(set, get, store),
      ...createMiscSlice(set, get, store),
      ...createSettingsSlice(set, get, store),
    })),
    {
      name: 'main-store',
    }
  )
);
