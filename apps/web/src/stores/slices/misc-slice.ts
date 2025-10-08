import { StateCreator } from 'zustand';
import { Rank, Suit } from '@untitled-card-game/shared';

import { HighScoreState } from '@/types/high-score';
import { SettingsState } from '@/types/settings';

export type JokerValue = {
  cardId: string;
  rank: Rank;
  suit: Suit;
};

export type MiscState = {
  audioPlayerVisible: boolean;
  toggleAudioPlayerVisibility: () => void;
  jokerValues: Record<string, JokerValue>;
  setJokerValue: (cardId: string, rank: Rank, suit: Suit) => void;
  clearJokerValue: (cardId: string) => void;
  clearAllJokerValues: () => void;
};

// Combined store state type
type StoreState = HighScoreState & MiscState & SettingsState;

const initialState = {
  audioPlayerVisible: true,
  jokerValues: {} as Record<string, JokerValue>,
};

export const createMiscSlice: StateCreator<
  StoreState,
  [['zustand/persist', unknown], ['zustand/devtools', never]],
  [],
  MiscState
> = (set, get) => ({
  ...initialState,
  toggleAudioPlayerVisibility: () => {
    set({ audioPlayerVisible: !get().audioPlayerVisible });
  },
  setJokerValue: (cardId: string, rank: Rank, suit: Suit) => {
    set({
      jokerValues: {
        ...get().jokerValues,
        [cardId]: { cardId, rank, suit },
      },
    });
  },
  clearJokerValue: (cardId: string) => {
    const { [cardId]: _, ...rest } = get().jokerValues;
    set({ jokerValues: rest });
  },
  clearAllJokerValues: () => {
    set({ jokerValues: {} });
  },
});
