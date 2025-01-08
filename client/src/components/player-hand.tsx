'use client';

import { ABCard, ABCards } from '@annabelle/shared/core/card';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AnimatePresence, motion } from 'framer-motion';
import ABCardComp from '@/components/ab-card';

type Props = {
  cards: ABCards;
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
  const { cards } = props;

  return (
    <div className="flex gap-4">
      <AnimatePresence>
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <SortableCard card={card} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
