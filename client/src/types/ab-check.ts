import * as z from 'zod';
import allConstants from '@/utils/constants';

const { MIN_WORD_LENGTH } = allConstants;

export const abCheckSchema = z
  .object({
    abWord: z
      .string()
      .min(
        MIN_WORD_LENGTH,
        'The word/fragment must contain at least ' + MIN_WORD_LENGTH + ' letters'
      )
      .regex(
        /^[a-zA-Z]*(?:\*[a-zA-Z]*){0,3}$/,
        'Only letters and (up to 3) asterisks (*) are allowed'
      ),
  })
  .required();

export type FormData = z.infer<typeof abCheckSchema>;
