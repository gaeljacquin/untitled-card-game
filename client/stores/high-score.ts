import { HighScoreStore } from 'types/high-score';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export const initialHighScores = {
  four: {
    value: 0,
    date: new Date(),
    gameState: [],
  },

  five: {
    value: 0,
    date: new Date(),
    gameState: [],
  },
};

const highScoreStore = create(
  persist(
    devtools<HighScoreStore>((set, get) => ({
      ...initialHighScores,
      _hasHydrated: false,
      setHasHydrated: (_hasHydrated) => {
        set({ _hasHydrated });
      },
      setHighScore: (slugId, highScore) => {
        set({ [slugId]: highScore });
      },
      resetHighScore: (slugId) => {
        set({ [slugId]: initialHighScores[slugId] });
      },
      getHighScore: (slugId) => {
        const highScore = get()[slugId];

        return highScore;
      },
    })),
    {
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
      name: 'high-scores',
      partialize: (state) => {
        const { _hasHydrated, ...rest } = state;
        void _hasHydrated;

        return { ...rest };
      },
    }
  )
);

export default highScoreStore;
