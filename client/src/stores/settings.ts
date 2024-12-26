import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { SettingsStore } from '@/types/settings';

const initialState = {
  cardBack: 0,
  music: 50,
  soundfx: 50,
  timer: 3,
};

const settingsStore = create(
  persist(
    devtools<SettingsStore>((set, get) => ({
      ...initialState,
      _hasHydrated: false,
      setHasHydrated: (_hasHydrated) => {
        set({ _hasHydrated });
      },
      updateSettings: (settings) => {
        set({ ...settings, _hasHydrated: true });
      },
      resetSettings: () => {
        set({ ...initialState, _hasHydrated: true });
      },
      getSettings: () => get(),
    })),
    {
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
      name: 'settings',
      partialize: (state) => {
        const { _hasHydrated, ...rest } = state;
        void _hasHydrated;

        return { ...rest };
      },
    }
  )
);

export default settingsStore;
