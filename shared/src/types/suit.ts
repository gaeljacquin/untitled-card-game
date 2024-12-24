const HEARTS = {
  sign: "♥",
  label: "Hearts",
  id: "hearts",
  isRed: true,
};
const SPADES = {
  sign: "♠",
  label: "Spades",
  id: "spades",
  isRed: false,
};
const DIAMONDS = {
  sign: "♦",
  label: "Diamonds",
  id: "diamonds",
  isRed: true,
};
const CLUBS = {
  sign: "♣",
  label: "Clubs",
  id: "clubs",
  isRed: false,
};

export type Suit =
  | typeof HEARTS
  | typeof SPADES
  | typeof DIAMONDS
  | typeof CLUBS;

export const SUITS = { HEARTS, SPADES, DIAMONDS, CLUBS };
