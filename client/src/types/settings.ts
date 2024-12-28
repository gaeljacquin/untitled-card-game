import * as z from 'zod';
import { Hydrate } from '@/types/hydrate';
import allConstants from '@/utils/constants';

const {
  cardBacks,
  cardFronts,
  TIMER_MIN,
  TIMER_MAX,
  NUM_CARDS_IN_HAND_MIN,
  NUM_CARDS_IN_HAND_MAX,
} = allConstants;

export const settingsSchema = z.object({
  cardBack: z.number().min(0).max(cardBacks.length),
  cardFront: z.number().min(0).max(cardFronts.length),
  previewCard: z.object({
    suit: z.string(),
    rank: z.string(),
    letter: z.string().min(1).max(1),
  }),
  labelNotValue: z.boolean(),
  timer: z.coerce.number().int().positive().min(TIMER_MIN).max(TIMER_MAX),
  playerCards: z.coerce
    .number()
    .int()
    .positive()
    .min(NUM_CARDS_IN_HAND_MIN)
    .max(NUM_CARDS_IN_HAND_MAX),
  showAudioPlayer: z.boolean(),
});

export type FormData = z.infer<typeof settingsSchema>;

export type SettingsStore = FormData &
  Hydrate & {
    updateSettings: (arg0: Partial<FormData>) => void;
    resetSettings: () => void;
    getSettings: () => FormData;
  };
