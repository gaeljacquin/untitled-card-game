import { maxDeal, minDeal } from '../constants/card';
import ABCard from '../core/card';

export function dealCards(amount: number) {
  if (amount < minDeal || amount > maxDeal) {
    throw new Error('Invalid amount');
  }

  const newCards = Array(amount)
    .fill(null)
    .map(() => new ABCard());

  return newCards;
}
