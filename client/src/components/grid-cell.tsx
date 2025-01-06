'use client';

import { IGridCell } from '@annabelle/shared/core/grid-cell';
import { useDroppable } from '@dnd-kit/core';
import { motion } from 'framer-motion';

interface Props {
  cell: IGridCell;
}

export function GridCell(props: Props) {
  const { cell } = props;
  const { setNodeRef, isOver } = useDroppable({
    id: cell.id,
    data: { type: 'grid', rowIndex: cell.rowIndex, columnIndex: cell.columnIndex },
  });

  return (
    <motion.div
      ref={setNodeRef}
      className="w-28 h-40 border-2 rounded-lg flex items-center justify-center"
      animate={{
        borderColor: isOver ? '#3b82f6' : '#e5e7eb',
        backgroundColor: isOver ? '#eff6ff' : 'transparent',
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
        >
          <></>
        </motion.div>
      )}
    </motion.div>
  );
}
