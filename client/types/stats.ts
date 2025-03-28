import { Hydrate } from 'types/hydrate';

type Stats = {
  currentStreak: number;
  bestStreak: number;
  highScore: number;
};

export type HiddenStats = unknown & Stats;

export type StatsStore = Stats &
  Hydrate & {
    updateBestStreak: (arg0: number) => void;
    updateHighScore: (arg0: number) => void;
    getStats: () => Stats;
  };
