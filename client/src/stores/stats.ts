import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { StatsStore } from '@/types/stats';

const initialState = {
  currentStreak: 0,
  bestStreak: 0,
  highScore: 0,
};

const statsStore = create(
  persist(
    devtools<StatsStore>((set, get) => ({
      ...initialState,
      _hasHydrated: false,
      setHasHydrated: (_hasHydrated) => {
        set({ _hasHydrated });
      },
      getStats: () => get(),
      updateBestStreak: (bestStreak) => {
        set({ bestStreak });
      },
      updateHighScore: (highScore) => {
        set({ highScore });
      },
    })),
    {
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
      name: 'stats',
      partialize: (state) => {
        const { _hasHydrated, currentStreak, ...rest } = state;
        void { _hasHydrated, currentStreak };

        return { ...rest };
      },
    }
  )
);

export default statsStore;
