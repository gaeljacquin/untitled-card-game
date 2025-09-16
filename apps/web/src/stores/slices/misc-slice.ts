import { StateCreator } from 'zustand';

import { HighScoreState } from '@/types/high-score';
import { SettingsState } from '@/types/settings';

export type MiscState = {
  audioPlayerVisible: boolean;
  toggleAudioPlayerVisibility: () => void;
  askRtfm: boolean;
  muteAskRtfm: () => void;
};

// Combined store state type
type StoreState = HighScoreState & MiscState & SettingsState;

const initialState = {
  audioPlayerVisible: true,
  askRtfm: true,
};

export const createMiscSlice: StateCreator<
  StoreState,
  [['zustand/persist', unknown], ['zustand/devtools', never]],
  [],
  MiscState
> = (set, get) => ({
  ...initialState,
  toggleAudioPlayerVisibility: () => {
    set({ audioPlayerVisible: !get().audioPlayerVisible } as Partial<StoreState>);
  },
  muteAskRtfm: () => {
    set({ askRtfm: false } as Partial<StoreState>);
  },
});
