import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ABToolsStore } from '@/types/ab-tools';

const abToolsStore = create(
  persist(
    devtools<ABToolsStore>((set, get) => ({
      _hasHydrated: false,
      abCheckStatus: {
        abWord: '',
        valid: false,
      },
      setHasHydrated: (_hasHydrated) => {
        set({ _hasHydrated });
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
      name: 'AB Tools',
      partialize: (state) => {
        void state;
      },
    }
  )
);

export default abToolsStore;
