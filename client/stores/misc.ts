import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type MiscStore = {
  audioPlayerVisible: boolean;
  toggleAudioPlayerVisibility: () => void;
  askRtfm: boolean;
  muteAskRtfm: () => void;
};

const initialState = {
  audioPlayerVisible: true,
  askRtfm: true,
};

const miscStore = create(
  persist(
    devtools<MiscStore>((set, get) => ({
      ...initialState,
      getMisc: () => get(),
      toggleAudioPlayerVisibility: () => {
        set({ audioPlayerVisible: !get().audioPlayerVisible });
      },
      muteAskRtfm: () => {
        set({ askRtfm: false });
      },
    })),
    {
      name: 'misc',
    }
  )
);

export default miscStore;
