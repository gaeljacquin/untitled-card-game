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
  if (!plainCard) {
    throw new Error('Cannot reconstruct null or undefined card');
  }

  // Socket.IO serializes class instances with their private properties
  // The actual rank/suit data is in _currentRank/_currentSuit or _rank/_suit
  const rankData = plainCard._currentRank || plainCard._rank || plainCard.rank;
  const suitData = plainCard._currentSuit || plainCard._suit || plainCard.suit;

  if (!rankData || !rankData.id) {
    throw new Error('Card is missing rank information');
  }

  if (!suitData || !suitData.id) {
    throw new Error('Card is missing suit information');
  }

  const rank = Rank.getById(rankData.id);
  const suit = Suit.getById(suitData.id);
  const card = new ABCard(rank, suit, plainCard.faceUp ?? true);

  // Restore played and discard states
  if (plainCard.played) {
    card.setPlayed(true);
  }
  if (plainCard.discard) {
    card.setDiscard(true);
  }

  // If this was a joker with a different value, restore it
  const baseRankData = plainCard._baseRank;
  if (baseRankData && baseRankData.isJoker && rankData.id !== baseRankData.id) {
    // The joker was assigned a specific value, restore it
    card.setJokerValue(rank, suit);
  }

  return card;
}

/**
 * Reconstructs an array of ABCard instances from plain objects.
 */
export function reconstructCards(plainCards: any[]): ABCard[] {
  if (!plainCards || !Array.isArray(plainCards)) {
    return [];
  }

  return plainCards.filter((card) => card != null).map(reconstructCard);
}
