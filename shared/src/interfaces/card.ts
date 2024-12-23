import { Letter } from "../types/letter";
import { Rank } from "../types/rank";
import { Suit } from "../types/suit";

export interface Card {
  rank: Rank;
  suit: Suit;
  letter: Letter;
  className?: string;
}
