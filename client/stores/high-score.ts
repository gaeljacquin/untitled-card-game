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
      name: 'high-scores',
    }
  )
);

export default highScoreStore;
