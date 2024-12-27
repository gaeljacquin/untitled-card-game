const vowels = [...'aeiou'];
const consonants = [...'bcdfghjklmnpqrstvwxyz'];
export const alphabetAlt = vowels.concat(consonants);

export type Letter = (typeof alphabetAlt)[number];
