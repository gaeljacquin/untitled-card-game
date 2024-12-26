import { ABWord } from '@/core/word';

// export function checkABWord(items: ABWord) {
//   const plainWord = items.map((item) => item.letter).join('');

//   return plainWord;
// }

export function checkWord(items: ABWord) {
  const plainWord = items.map((item) => item.letter).join('');

  return plainWord;
}
