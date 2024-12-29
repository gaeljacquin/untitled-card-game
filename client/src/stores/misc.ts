import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type MiscStore = {
  askRtfm: boolean;
  muteAskRtfm: () => void;
};

const initialState = {
  askRtfm: true,
};

const miscStore = create(
  persist(
    devtools<MiscStore>((set, get) => ({
      ...initialState,
      getMisc: () => get(),
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
