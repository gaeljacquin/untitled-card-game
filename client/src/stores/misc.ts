import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type MiscStore = {
  audioPlayerVisible: boolean;
  toggleAudioPlayerVisibility: () => void;
};

const initialState = {
  audioPlayerVisible: true,
};

const miscStore = create(
  persist(
    devtools<MiscStore>((set, get) => ({
      ...initialState,
      getMisc: () => get(),
      toggleAudioPlayerVisibility: () => {
        set({ audioPlayerVisible: !get().audioPlayerVisible });
      },
    })),
    {
      name: 'misc',
    }
  )
);

export default miscStore;
