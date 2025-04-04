import { createAudioSlice } from 'stores/slices/audio-slice';
import { createHighScoreSlice } from 'stores/slices/high-scores-slice';
import { createMiscSlice, MiscState } from 'stores/slices/misc-slice';
import { createSettingsSlice } from 'stores/slices/settings-slice';
import { AudioState } from 'types/audio';
import { HighScoreState } from 'types/high-score';
import { SettingsState } from 'types/settings';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type StoreState = AudioState & HighScoreState & MiscState & SettingsState;

export const useUcgStore = create<StoreState>()(
  persist(
    devtools((set, get, store) => ({
      ...createAudioSlice(set, get, store),
      ...createHighScoreSlice(set, get, store),
      ...createMiscSlice(set, get, store),
      ...createSettingsSlice(set, get, store),
    })),
    {
      name: 'main-store',
    }
  )
);
