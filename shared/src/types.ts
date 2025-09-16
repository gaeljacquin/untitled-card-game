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

// Suit and Rank types (defined early for ABCard)
export type SuitId = 'hearts' | 'diamonds' | 'clubs' | 'spades';

export interface SuitType {
  id: SuitId;
  name: string;
  symbol: string;
  color: string;
  isRed: boolean;
  label: string;
}

export type RankId = 'ace' | 'two' | 'three' | 'four' | 'five' | 'six' | 'seven' | 'eight' | 'nine' | 'ten' | 'jack' | 'queen' | 'king';

export interface RankType {
  id: RankId;
  name: string;
  value: number;
  symbol: string;
  label: string;
}

// Card-related types
export interface ABCard {
  id: string;
  rank: RankType;
  suit: SuitType;
  value: number;
  faceUp: boolean;
  played: boolean;
  letter?: string;
}

export type ABCards = ABCard[];

// Grid types
export interface IABGridCell {
  card?: ABCard | null;
  id: string;
  rowIndex: number;
  columnIndex: number;
}

// Mode types
export type SlugId = 'four' | 'five';

export interface IABModeType {
  slug: SlugId;
  title: string;
  gridSize: number;
  description?: string;
  type?: string;
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

// Evaluation result types
export interface EvaluationResult {
  name: string;
  points: number;
}

export interface ScoreResult {
  score: number;
  discardBonus: BonusResult;
  specialBonus: BonusResult;
}

export interface BonusResult {
  name: string;
  points: number;
}

// Game state types
export interface GameStateType {
  gameOver: boolean;
  score: number;
  discardBonus?: BonusResult;
  specialBonus?: BonusResult;
}

// Empty hand constant
export const emptyHand: ABCards = [];

// Default bonus results
export const emptyBonus: BonusResult = {
  name: 'No Bonus',
  points: 0
};
