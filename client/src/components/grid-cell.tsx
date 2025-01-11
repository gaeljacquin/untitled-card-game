'use client';

import { IGridCell } from '@annabelle/shared/core/grid-cell';
import { IABModeType } from '@annabelle/shared/core/mode';
import { useDroppable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import ABCardComp from '@/components/ab-card';
import { BorderBeam } from '@/components/ui/border-beam';
import { cn } from '@/lib/utils';

interface Props {
  cell: IGridCell;
  modeType: IABModeType;
  gridSize: number;
  lockedCells: Set<string>;
  rowIndex: number;
  columnIndex: number;
}

export function GridCell(props: Props) {
  const { cell, modeType, gridSize, lockedCells, rowIndex, columnIndex } = props;
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

  const shouldShowBorderBeam = isCornerCell || isCenterCell;

  return (
    <motion.div
      ref={setNodeRef}
      className="aspect-[3/4] bg-amber-950/30 rounded-2xl overflow-hidden border border-white transition-transform relative group"
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
          className={cn('p-0 sm:p-1', cell.card.played && 'brightness-50')}
        >
          <ABCardComp card={cell.card} modeType={modeType} isDragging />
        </motion.div>
      )}
      {shouldShowBorderBeam && (
        <BorderBeam
          size={125}
          duration={7}
          borderWidth={3}
          colorFrom={'#67e8f9'} // cyan-300
          colorTo={'#34d399'} // emerald-400
        />
      )}
    </motion.div>
  );
}
