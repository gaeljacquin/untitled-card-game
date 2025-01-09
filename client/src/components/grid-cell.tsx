'use client';

import { IGridCell } from '@annabelle/shared/core/grid-cell';
import { IABModeType } from '@annabelle/shared/core/mode';
import { useDroppable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import ABCardComp from '@/components/ab-card';

// import { cn } from '@/lib/utils';

interface Props {
  cell: IGridCell;
  modeType: IABModeType;
}

export function GridCell(props: Props) {
  const { cell, modeType } = props;
  const { setNodeRef, isOver } = useDroppable({
    id: cell.id,
    data: { type: 'grid', rowIndex: cell.rowIndex, columnIndex: cell.columnIndex },
  });

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
          className="p-1"
        >
          <ABCardComp card={cell.card} modeType={modeType} isDragging />
        </motion.div>
      )}
    </motion.div>
  );
}
