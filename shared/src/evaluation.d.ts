import type { IABGridCell, EvaluationResult, ScoreResult, ABCards, IABModeType } from './types';
export declare function evaluateGridRow(grid: IABGridCell[][], rowIndex: number): EvaluationResult;
export declare function evaluateGridColumn(grid: IABGridCell[][], columnIndex: number): EvaluationResult;
export declare function calculateScore(grid: IABGridCell[][], mode?: IABModeType, discardPile?: ABCards): ScoreResult;
