import * as z from 'zod';
import { cardBacks, cardFronts } from '@/stores/settings';
import { Hydrate } from '@/types/hydrate';

export const settingsSchema = z.object({
  cardBack: z.number().min(0).max(cardBacks.length),
  cardFront: z.number().min(0).max(cardFronts.length),
  previewCard: z.object({
    suit: z.string(),
    rank: z.string(),
    letter: z.string().min(1).max(1),
  }),
  labelNotValue: z.boolean(),
  rankSwitchLetter: z.boolean(),
  invertColors: z.boolean(),
});

export type FormData = z.infer<typeof settingsSchema>;

export type SettingsStore = FormData &
  Hydrate & {
    updateSettings: (arg0: Partial<FormData>) => void;
    resetSettings: () => void;
    getSettings: () => FormData;
  };
