// Shared TypeScript types

// Basic game types
export interface Player {
  id: string;
  name: string;
}

export interface GameState {
  players: Player[];
  currentPlayer: string;
  isGameOver: boolean;
}

// Card-related types
export interface ABCard {
  id: string;
  rank: string;
  suit: string;
  value: number;
  faceUp: boolean;
  played: boolean;
  letter?: string;
}

export type ABCards = ABCard[];

export interface ABCardPreview {
  rank: string;
  suit: string;
  letter: string;
}

// Grid types
export interface IABGridCell {
  card?: ABCard | null;
  id: string;
  rowIndex: number;
  columnIndex: number;
}

// Mode types
export type SlugId = 'classic' | 'four' | 'five' | string;

export interface IABModeType {
  slug: SlugId;
  title: string;
  gridSize: number;
}

// Suit and Rank types
export type SuitId = 'hearts' | 'diamonds' | 'clubs' | 'spades';

export interface SuitType {
  id: SuitId;
  name: string;
  symbol: string;
  color: string;
}

export type RankId = 'ace' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight' | 'nine' | 'ten' | 'jack' | 'queen' | 'king';

export interface RankType {
  id: RankId;
  name: string;
  value: number;
  symbol: string;
}

// Socket.IO event types
export interface GameInitPayload {
  modeSlug: string;
}

export interface GameInitResponse {
  abCards: ABCard[];
}

export interface GameNextRoundPayload {
  abDiscard: ABCard;
  newGrid: IABGridCell[][];
}

export interface GameNextRoundResponse {
  gameOver?: boolean;
  abCards?: ABCard[];
}

// Suit icon mapping
export const suitIconMap: Record<SuitId, string> = {
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
  spades: '♠'
};

// Empty hand constant
export const emptyHand: ABCards = [];
