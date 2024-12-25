import { minCardsinHand, maxCardsinHand } from "../constants/card";
import ABCard from "../classes/card";

export function getStartingCard() {
  const startingCard = new ABCard();
  startingCard.setStarting();

  return startingCard;
}

export function getNewCards(amount: number) {
  if (amount < minCardsinHand || amount > maxCardsinHand) {
    throw new Error("Invalid amount");
  }

  const newCards = Array(amount)
    .fill(null)
    .map(() => new ABCard());

  return newCards;
}
