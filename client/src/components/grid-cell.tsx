'use client';

import { useDroppable } from '@dnd-kit/core';
import { IABGridCell, IABModeType } from '@gaeljacquin/ucg-shared';
import ABCardComp from '@/components/ab-card';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function GridCell({
  cell,
  modeType,
  gridSize,
  lockedCells,
  rowIndex,
  columnIndex,
  rankLabel,
}: {
  cell: IABGridCell;
  modeType: IABModeType;
  gridSize: number;
  lockedCells: Set<string>;
  rowIndex: number;
  columnIndex: number;
  rankLabel: boolean;
}) {
  const droppable = {
    id: cell.id,
    data: {
      type: 'grid',
      rowIndex: cell.rowIndex,
      columnIndex: cell.columnIndex,
      isLocked: lockedCells.has(`cell-${rowIndex}-${columnIndex}`),
    },
  };
  const { setNodeRef, isOver } = useDroppable(droppable);

  const isCornerCell =
    (cell.rowIndex === 0 && cell.columnIndex === 0) ||
    (cell.rowIndex === 0 && cell.columnIndex === gridSize - 1) ||
    (cell.rowIndex === gridSize - 1 && cell.columnIndex === 0) ||
    (cell.rowIndex === gridSize - 1 && cell.columnIndex === gridSize - 1);

  const isCenterCell =
    gridSize % 2 === 1 &&
    cell.rowIndex === Math.floor(gridSize / 2) &&
    cell.columnIndex === Math.floor(gridSize / 2);

  const shouldGlow = isCornerCell || isCenterCell;

  return (
    <motion.div
      ref={setNodeRef}
      className={cn(
        'aspect-3/4 bg-amber-950/30 rounded-2xl overflow-hidden border border-white transition-transform relative group',
        shouldGlow && 'shadow-animate-2'
      )}
      animate={{
        borderColor: isOver ? '#3b82f6' : '#e5e7eb',
        backgroundColor: isOver ? '#eff6ff' : 'rgba(255, 255, 255, 0)',
      }}
    >
      {cell.card && (
        <motion.div
          layout
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          className={cn('p-0 sm:p-1', cell.card.played && 'brightness-90 hover:brightness-95')}
        >
          <ABCardComp card={cell.card} modeType={modeType} rankLabel={rankLabel} isDragging />
        </motion.div>
      )}
    </motion.div>
  );
}
