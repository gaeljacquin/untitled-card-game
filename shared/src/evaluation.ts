// Game evaluation functions

import type { IABGridCell, EvaluationResult, ScoreResult, BonusResult, ABCards, IABModeType } from './types';

export function evaluateGridRow(grid: IABGridCell[][], rowIndex: number): EvaluationResult {
  // TODO: Implement actual row evaluation logic
  const row = grid[rowIndex];
  if (!row) return { name: 'Empty Row', points: 0 };
  
  let score = 0;
  for (const cell of row) {
    if (cell.card) {
      score += cell.card.value;
    }
  }
  return { name: `Row ${rowIndex + 1}`, points: score };
}

export function evaluateGridColumn(grid: IABGridCell[][], columnIndex: number): EvaluationResult {
  // TODO: Implement actual column evaluation logic
  let score = 0;
  for (const row of grid) {
    if (row[columnIndex]?.card) {
      score += row[columnIndex].card.value;
    }
  }
  return { name: `Column ${columnIndex + 1}`, points: score };
}

export function calculateScore(grid: IABGridCell[][], mode?: IABModeType, discardPile?: ABCards): ScoreResult {
  // TODO: Implement actual score calculation
  let totalScore = 0;
  
  // Calculate row scores
  for (let i = 0; i < grid.length; i++) {
    totalScore += evaluateGridRow(grid, i).points;
  }
  
  // Calculate column scores (avoid double counting)
  for (let i = 0; i < (grid[0]?.length || 0); i++) {
    totalScore += evaluateGridColumn(grid, i).points;
  }
  
  // Calculate bonuses
  const discardBonus: BonusResult = {
    name: 'Discard Bonus',
    points: discardPile?.length ? discardPile.length * 5 : 0
  };
  
  const specialBonus: BonusResult = {
    name: 'Special Bonus',
    points: mode?.gridSize === 25 ? 100 : 50 // Example bonus logic
  };
  
  return {
    score: totalScore,
    discardBonus,
    specialBonus
  };
}
