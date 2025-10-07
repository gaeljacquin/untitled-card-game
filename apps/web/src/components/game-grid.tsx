'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { evaluateGridColumn, evaluateGridRow, IABGridCell } from '@untitled-card-game/shared';
import { motion } from 'motion/react';

import { GridCell } from '@/components/grid-cell';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const labelClass = cn(
  'hidden sm:flex',
  'items-center justify-center',
  'text-white/70 text-sm md:text-base',
  'font-medium',
  '[&]:w-auto! [&]:h-auto! [&]:aspect-none!'
);
const cornerCellClass = cn('aspect-none', 'w-auto h-auto', 'hidden sm:flex');

// Helper component to show tooltip only when text is truncated
const TruncatedText = ({ text }: { text: string }) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
      }
    };

    checkTruncation();
    window.addEventListener('resize', checkTruncation);
    return () => window.removeEventListener('resize', checkTruncation);
  }, [text]);

  if (isTruncated) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span ref={textRef} className="truncate block max-w-full">
            {text}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <span ref={textRef} className="truncate block max-w-full">
      {text}
    </span>
  );
};

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
    <TooltipProvider>
      <div className={gridClass}>
        <div className={cornerCellClass} />

        {Array.from({ length: gridSize }, (_, colIndex) => (
          <div key={`col-${colIndex}`} className={cn(labelClass, '-mt-3')}>
            <motion.div className="flex flex-col items-center min-w-0">
              <TruncatedText text={`${evaluateGridColumn(grid, colIndex).name}:`} />
              <span className="text-clip">${evaluateGridColumn(grid, colIndex).points}</span>
            </motion.div>
          </div>
        ))}

        {grid.map((row, rowIndex) => (
          <Fragment key={`row-${rowIndex}`}>
            <div className={cn(labelClass, '-ml-2')}>
              <motion.div className="mr-4 flex flex-col items-end min-w-0">
                <TruncatedText text={`${evaluateGridRow(grid, rowIndex).name}:`} />
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
    </TooltipProvider>
  );
};

export default GameGrid;
