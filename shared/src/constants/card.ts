export const vowels = [...'aeiou'];
export const consonants = [...'bcdfghjklmnpqrstvwxyz'];
export const alphabet = vowels.concat(consonants);

export const ace = { value: 1, label: 'A', id: 'ace', labelFull: 'Ace' };
export const two = { value: 2, label: '2', id: 'two', labelFull: 'Two' };
export const three = { value: 3, label: '3', id: 'three', labelFull: 'Three' };
export const four = { value: 4, label: '4', id: 'four', labelFull: 'Four' };
export const five = { value: 5, label: '5', id: 'five', labelFull: 'Five' };
export const six = { value: 6, label: '6', id: 'six', labelFull: 'Six' };
export const seven = { value: 7, label: '7', id: 'seven', labelFull: 'Seven' };
export const eight = { value: 8, label: '8', id: 'eight', labelFull: 'Eight' };
export const nine = { value: 9, label: '9', id: 'nine', labelFull: 'Nine' };
export const ten = { value: 10, label: '10', id: 'ten', labelFull: 'Ten' };
export const jack = { value: 11, label: 'J', id: 'jack', labelFull: 'Jack' };
export const queen = { value: 12, label: 'Q', id: 'queen', labelFull: 'Queen' };
export const king = { value: 13, label: 'K', id: 'king', labelFull: 'King' };
// export const joker = { value: 0, label: "X", id: "joker", labelFull: 'Joker' };
export const ranks = {
  ace,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
  jack,
  queen,
  king,
  // joker,
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

export const minDeal = 1;

export const maxDeal = 5;
