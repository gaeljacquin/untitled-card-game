import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { SettingsStore } from '@/types/settings';
import allConstants from '@/utils/constants';

const { TIMER_MIN, NUM_CARDS_IN_HAND_DEFAULT } = allConstants;

const initialSettings = {
  cardBack: 0,
  cardFront: 0,
  previewCard: {
    suit: 'hearts',
    rank: 'ace',
    letter: 'B',
  },
  labelNotValue: true,
  rankSwitchLetter: false,
  timer: TIMER_MIN,
  playerCards: NUM_CARDS_IN_HAND_DEFAULT,
  showAudioPlayer: false,
};

const settingsStore = create(
  persist(
    devtools<SettingsStore>((set, get) => ({
      ...initialSettings,
      _hasHydrated: false,
      abCheckStatus: {
        abWord: '',
        valid: false,
      },
      setHasHydrated: (_hasHydrated) => {
        set({ _hasHydrated });
      },
      updateSettings: (settings) => {
        set({ ...settings, _hasHydrated: true });
      },
      resetSettings: () => {
        set({ ...initialSettings, _hasHydrated: true });
      },
      getSettings: () => get(),
      setAbCheckStatus: (abCheckStatus) => {
        set((prev) => ({ ...prev, abCheckStatus }));
      },
    })),
    {
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
      name: 'settings',
      partialize: (state) => {
        const { _hasHydrated, abCheckStatus, ...rest } = state;
        void _hasHydrated;
        void abCheckStatus;

        return { ...rest };
      },
    }
  )
);

export default settingsStore;
