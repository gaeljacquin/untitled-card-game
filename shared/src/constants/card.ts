import ABCard from '../core/card';

export const vowels = [...'aeiou'];
export const consonants = [...'bcdfghjklmnpqrstvwxyz'];
export const alphabet = vowels.concat(consonants);

export const aceRank = { value: 1, label: 'A', id: 'ace', labelFull: 'Ace' };
export const twoRank = { value: 2, label: '2', id: 'two', labelFull: 'Two' };
export const threeRank = { value: 3, label: '3', id: 'three', labelFull: 'Three' };
export const fourRank = { value: 4, label: '4', id: 'four', labelFull: 'Four' };
export const fiveRank = { value: 5, label: '5', id: 'five', labelFull: 'Five' };
export const sixRank = { value: 6, label: '6', id: 'six', labelFull: 'Six' };
export const sevenRank = { value: 7, label: '7', id: 'seven', labelFull: 'Seven' };
export const eightRank = { value: 8, label: '8', id: 'eight', labelFull: 'Eight' };
export const nineRank = { value: 9, label: '9', id: 'nine', labelFull: 'Nine' };
export const tenRank = { value: 10, label: '10', id: 'ten', labelFull: 'Ten' };
export const jackRank = { value: 11, label: 'J', id: 'jack', labelFull: 'Jack' };
export const queenRank = { value: 12, label: 'Q', id: 'queen', labelFull: 'Queen' };
export const kingRank = { value: 13, label: 'K', id: 'king', labelFull: 'King' };
// export const jokerRank = { value: 0, label: "X", id: "joker", labelFull: 'Joker' };
export const ranks = {
  aceRank,
  twoRank,
  threeRank,
  fourRank,
  fiveRank,
  sixRank,
  sevenRank,
  eightRank,
  nineRank,
  tenRank,
  jackRank,
  queenRank,
  kingRank,
  // jokerRank,
};

export const hearts = {
  sign: '♥',
  label: 'Hearts',
  id: 'hearts',
  isRed: true,
};
export const spades = {
  sign: '♠',
  label: 'Spades',
  id: 'spades',
  isRed: false,
};
export const diamonds = {
  sign: '♦',
  label: 'Diamonds',
  id: 'diamonds',
  isRed: true,
};
export const clubs = {
  sign: '♣',
  label: 'Clubs',
  id: 'clubs',
  isRed: false,
};
// export const jokerSuit = {
//   sign: "⭐",
//   label: "Joker",
//   id: "joker",
//   isRed: false,
// };
export const suits = { hearts, spades, diamonds, clubs /*, jokerSuit*/ };

export const previewCard = new ABCard(false, ranks.aceRank, suits.hearts, 'B');

export const minDeal = 1;

export const maxDeal = 5;
