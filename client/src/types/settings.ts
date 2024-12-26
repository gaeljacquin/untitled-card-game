import * as z from 'zod';
import { Hydrate } from '@/types/hydrate';
import allConstants from '@/utils/constants';

const { cardBacks, timerMinutes } = allConstants;

export const settingsSchema = z.object({
  cardBack: z.number().min(0).max(cardBacks.length),
  music: z.number().min(0).max(100),
  soundfx: z.number().min(0).max(100),
  timer: z.number().min(0).max(timerMinutes.length),
});

export type FormData = z.infer<typeof settingsSchema>;

export type SettingsStore = FormData &
  Hydrate & {
    updateSettings: (arg0: Partial<FormData>) => void;
    resetSettings: () => void;
    getSettings: () => FormData;
  };
