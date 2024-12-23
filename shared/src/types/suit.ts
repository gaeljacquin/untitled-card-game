const HEARTS = {
  sign: "♥",
  label: "Hearts",
  id: "hearts",
  className: "text-red-600",
};
const SPADES = {
  sign: "♠",
  label: "Spades",
  id: "spades",
  className: "text-black",
};
const DIAMONDS = {
  sign: "♦",
  label: "Diamonds",
  id: "diamonds",
  className: "text-red-600",
};
const CLUBS = {
  sign: "♣",
  label: "Clubs",
  id: "clubs",
  className: "text-black",
};

export type Suit =
  | typeof HEARTS
  | typeof SPADES
  | typeof DIAMONDS
  | typeof CLUBS;

export const SUITS = { HEARTS, SPADES, DIAMONDS, CLUBS };
