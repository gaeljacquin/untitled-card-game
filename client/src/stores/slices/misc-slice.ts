import { StateCreator } from 'zustand';

export type MiscState = {
  audioPlayerVisible: boolean;
  toggleAudioPlayerVisibility: () => void;
  askRtfm: boolean;
  muteAskRtfm: () => void;
};

const initialState = {
  audioPlayerVisible: true,
  askRtfm: true,
};

export const createMiscSlice: StateCreator<MiscState> = (set, get) => ({
  ...initialState,
  getMisc: () => get(),
  toggleAudioPlayerVisibility: () => {
    set({ audioPlayerVisible: !get().audioPlayerVisible });
  },
  muteAskRtfm: () => {
    set({ askRtfm: false });
  },
});
