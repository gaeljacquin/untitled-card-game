'use client';

import { Fragment } from 'react';
import { evaluateGridColumn, evaluateGridRow, IABGridCell } from '@untitled-card-game/shared';
import { GridCell } from '@/components/grid-cell';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const labelClass = cn(
  'hidden sm:flex',
  'items-center justify-center',
  'text-white/70 text-sm md:text-base',
  'font-medium',
  '[&]:w-auto! [&]:h-auto! [&]:aspect-none!'
);
const cornerCellClass = cn('aspect-none', 'w-auto h-auto', 'hidden sm:flex');

const GameGrid = ({
  grid,
  lockedCells,
  gridClass,
  gridSize,
  type,
  rankLabel,
}: {
  grid: IABGridCell[][];
  lockedCells: Set<string>;
  gridClass: string;
  gridSize: number;
  type: 'abpoker';
  rankLabel: boolean;
}) => {
  return (
    <div className={gridClass}>
      <div className={cornerCellClass} />

      {Array.from({ length: gridSize }, (_, colIndex) => (
        <div key={`col-${colIndex}`} className={cn(labelClass, '-mt-3')}>
          <motion.div>
            <span className="text-clip">{evaluateGridColumn(grid, colIndex).name}:</span>
            <br />
            <span className="text-clip">${evaluateGridColumn(grid, colIndex).points}</span>
          </motion.div>
        </div>
      ))}

      {grid.map((row, rowIndex) => (
        <Fragment key={`row-${rowIndex}`}>
          <div className={cn(labelClass, '-ml-2')}>
            <motion.div className="mr-4">
              <span className="text-clip">{evaluateGridRow(grid, rowIndex).name}:</span>
              <br />
              <span className="text-clip">${evaluateGridRow(grid, rowIndex).points}</span>
            </motion.div>
          </div>

          {row.map((cell, colIndex) => (
            <GridCell
              key={cell.id}
              cell={cell}
              modeType={type}
              gridSize={gridSize}
              lockedCells={lockedCells}
              rowIndex={rowIndex}
              columnIndex={colIndex}
              rankLabel={!rankLabel}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default GameGrid;
