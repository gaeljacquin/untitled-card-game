export interface Player {
    id: string;
    name: string;
}
export interface GameState {
    players: Player[];
    currentPlayer: string;
    isGameOver: boolean;
}
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
export interface IABGridCell {
    card?: ABCard | null;
    id: string;
    rowIndex: number;
    columnIndex: number;
}
export type SlugId = 'four' | 'five';
export interface IABModeType {
    slug: SlugId;
    title: string;
    gridSize: number;
    description?: string;
    type?: string;
}
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
export declare const suitIconMap: Record<SuitId, string>;
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
export interface GameStateType {
    gameOver: boolean;
    score: number;
    discardBonus?: BonusResult;
    specialBonus?: BonusResult;
}
export declare const emptyHand: ABCards;
export declare const emptyBonus: BonusResult;
