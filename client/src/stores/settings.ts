import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { SettingsStore } from '@/types/settings';
import allConstants from '@/utils/constants';

const { defaultSettings } = allConstants;

const settingsStore = create(
  persist(
    devtools<SettingsStore>((set, get) => ({
      ...defaultSettings,
      _hasHydrated: false,
      setHasHydrated: (_hasHydrated) => {
        set({ _hasHydrated });
      },
      updateSettings: (settings) => {
        set({ ...settings, _hasHydrated: true });
      },
      resetSettings: () => {
        set({ ...defaultSettings, _hasHydrated: true });
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
