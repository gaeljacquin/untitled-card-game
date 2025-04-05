import { abDesigns } from 'utils/ab-designs';
import * as z from 'zod';

export const settingsSchema = z.object({
  abDesignIndex: z.number().min(0).max(abDesigns.length),
  previewCard: z.object({
    suit: z.string(),
    rank: z.string(),
    letter: z.string().min(1).max(1),
  }),
  rankLabel: z.boolean(),
  invertColors: z.boolean(),
});

export type FormData = z.infer<typeof settingsSchema>;

export type SettingsState = FormData & {
  updateSettings: (arg0: Partial<FormData>) => void;
  resetSettings: () => void;
  getSettings: () => FormData;
};
