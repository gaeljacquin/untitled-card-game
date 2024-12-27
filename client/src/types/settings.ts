import * as z from 'zod';
import { Hydrate } from '@/types/hydrate';
import allConstants from '@/utils/constants';

const { cardBacks, cardFronts, timerOptions, playerCardsOptions } = allConstants;

export const settingsSchema = z.object({
  cardBack: z.number().min(0).max(cardBacks.length),
  cardFront: z.number().min(0).max(cardFronts.length),
  previewCard: z.object({
    suit: z.string(),
    rank: z.string(),
    letter: z.string().min(1).max(1),
  }),
  music: z.number().min(0).max(100),
  soundfx: z.number().min(0).max(100),
  timer: z.number().min(0).max(timerOptions.length),
  playerCards: z.number().min(0).max(playerCardsOptions.length),
});

export type FormData = z.infer<typeof settingsSchema>;

export type SettingsStore = FormData &
  Hydrate & {
    updateSettings: (arg0: Partial<FormData>) => void;
    resetSettings: () => void;
    getSettings: () => FormData;
  };
