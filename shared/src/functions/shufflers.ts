import { ABCards } from '../core/card';

// Fisher-Yates shuffle
export function shuffler(list: unknown[]) {
  const shuffled = [...list];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const shift = shuffled[i];
    shuffled[i] = shuffled[j]!;
    shuffled[j] = shift;
  }

  return shuffled;
}

export function getRandomIndex(list: unknown[]) {
  return Math.floor(Math.random() * list.length);
}

export function generateSeed(cards: ABCards, gridSize: number): ABCards[] {
  const shuffledCards = shuffler(cards) as ABCards;
  const seed: ABCards[] = [];
  const cardsPerDeal = gridSize + 1;

  for (let i = 0; i < gridSize; i++) {
    const deals: ABCards = [];

    for (let j = 0; j < cardsPerDeal; j++) {
      deals.push(shuffledCards[i * cardsPerDeal + j]);
    }

    seed.push(deals);
  }

  return seed;
}
