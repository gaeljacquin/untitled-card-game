'use client';

import { IABModeType } from '@annabelle/shared/core/mode';
import { ABCards } from '@annabelle/shared/core/word';
import { AnimatePresence, motion } from 'framer-motion';
import ABCardComp from '@/components/ab-card';

interface Props {
  cards: ABCards;
  modeType: IABModeType;
}

export default function DiscardPile(props: Props) {
  const { cards, modeType } = props;

  return (
    <>
      <div className="flex items-center justify-center gap-2 mb-4">
        <h2 className="text-lg text-center font-bold">Discard Pile</h2>
      </div>
      <AnimatePresence>
        <div className="grid grid-cols-1 gap-4">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              className="flex items-center justify-center gap-2 mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="text-center text-lg font-semibold">
                <ABCardComp card={card} modeType={modeType} />
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </>
  );
}
