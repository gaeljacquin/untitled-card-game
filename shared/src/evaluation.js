"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateGridRow = evaluateGridRow;
exports.evaluateGridColumn = evaluateGridColumn;
exports.calculateScore = calculateScore;
function evaluateGridRow(grid, rowIndex) {
    const row = grid[rowIndex];
    if (!row)
        return { name: 'Empty Row', points: 0 };
    let score = 0;
    for (const cell of row) {
        if (cell.card) {
            score += cell.card.value;
        }
    }
    return { name: `Row ${rowIndex + 1}`, points: score };
}
function evaluateGridColumn(grid, columnIndex) {
    let score = 0;
    for (const row of grid) {
        if (row[columnIndex]?.card) {
            score += row[columnIndex].card.value;
        }
    }
    return { name: `Column ${columnIndex + 1}`, points: score };
}
function calculateScore(grid, mode, discardPile) {
    let totalScore = 0;
    for (let i = 0; i < grid.length; i++) {
        totalScore += evaluateGridRow(grid, i).points;
    }
    for (let i = 0; i < (grid[0]?.length || 0); i++) {
        totalScore += evaluateGridColumn(grid, i).points;
    }
    const discardBonus = {
        name: 'Discard Bonus',
        points: discardPile?.length ? discardPile.length * 5 : 0
    };
    const specialBonus = {
        name: 'Special Bonus',
        points: mode?.gridSize === 25 ? 100 : 50
    };
    return {
        score: totalScore,
        discardBonus,
        specialBonus
    };
}
//# sourceMappingURL=evaluation.js.map