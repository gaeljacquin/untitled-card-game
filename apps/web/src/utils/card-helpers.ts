import { ABCard, Rank, Suit } from '@untitled-card-game/shared';

/**
 * Checks if a card is a joker.
 * Works with both ABCard instances and plain card objects from Socket.IO.
 */
export function isJokerCard(card: ABCard | any): boolean {
  // If it has the isJoker method, use it
  if (typeof card.isJoker === 'function') {
    return card.isJoker();
  }

  // Otherwise, check the rank directly
  if (card.rank && typeof card.rank.isJoker === 'boolean') {
    return card.rank.isJoker;
  }

  // Fallback: check if rank id is a joker
  if (card.rank && (card.rank.id === 'joker-red' || card.rank.id === 'joker-black')) {
    return true;
  }

  return false;
}

/**
 * Gets the base rank of a card (for jokers).
 * Works with both ABCard instances and plain card objects.
 */
export function getCardBaseRank(card: ABCard | any): any {
  if (typeof card.getBaseRank === 'function') {
    return card.getBaseRank();
  }

  // For plain objects, the rank is the base rank
  return card.rank;
}

/**
 * Gets the base suit of a card (for jokers).
 * Works with both ABCard instances and plain card objects.
 */
export function getCardBaseSuit(card: ABCard | any): any {
  if (typeof card.getBaseSuit === 'function') {
    return card.getBaseSuit();
  }

  // For plain objects, the suit is the base suit
  return card.suit;
}

/**
 * Reconstructs an ABCard instance from a plain object.
 */
export function reconstructCard(plainCard: any): ABCard {
  const rank = Rank.getById(plainCard.rank.id);
  const suit = Suit.getById(plainCard.suit.id);
  const card = new ABCard(rank, suit, plainCard.faceUp);

  // Restore played and discard states
  if (plainCard.played) {
    card.setPlayed(true);
  }
  if (plainCard.discard) {
    card.setDiscard(true);
  }

  return card;
}

/**
 * Reconstructs an array of ABCard instances from plain objects.
 */
export function reconstructCards(plainCards: any[]): ABCard[] {
  return plainCards.map(reconstructCard);
}
