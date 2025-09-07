import { create, StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { createHighScoreSlice } from '@/stores/slices/high-scores-slice';
import { createMiscSlice, MiscState } from '@/stores/slices/misc-slice';
import { createSettingsSlice } from '@/stores/slices/settings-slice';
import { HighScoreState } from '@/types/high-score';
import { SettingsState } from '@/types/settings';

export type StoreState = HighScoreState & MiscState & SettingsState;

const storeCreator: StateCreator<
  StoreState,
  [['zustand/persist', unknown], ['zustand/devtools', never]],
  [],
  StoreState
> = (set, get, store) => ({
  ...createHighScoreSlice(set, get, store),
  ...createMiscSlice(set, get, store),
  ...createSettingsSlice(set, get, store),
});

export const useUcgStore = create<StoreState>()(
  persist(
    devtools(storeCreator, {
      name: 'ucg-store-devtools',
    }),
    {
      name: 'ucg-store',
    }
  )
);
