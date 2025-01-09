'use client';

import { ABCard } from '@annabelle/shared/core/card';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AnimatePresence, motion } from 'framer-motion';
import ABCardComp from '@/components/ab-card';

type Props = {
  card: ABCard;
};

function SortableCard({ card }: { card: ABCard }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: card.id,
    data: { type: 'hand' },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ABCardComp card={card} />
    </div>
  );
}

export function PlayerHand(props: Props) {
  const { card } = props;
  const spring = {
    type: 'spring',
    damping: 25,
    stiffness: 120,
  };

  return (
    <div className="flex gap-4">
      <AnimatePresence>
        <motion.div
          key={card.id}
          variants={{ hover: spring }}
          initial="rest"
          animate="hover"
          exit="rest"
        >
          <SortableCard card={card} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
