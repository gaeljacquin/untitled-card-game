'use client';

import { IABModeType } from '@annabelle/shared/core/mode';
import { ABCards } from '@annabelle/shared/core/word';
import { AnimatePresence, motion } from 'framer-motion';
import ABCardComp from '@/components/ab-card';
import { cn } from '@/lib/utils';

interface Props {
  cards: ABCards;
  modeType: IABModeType;
}

export default function DiscardPile(props: Props) {
  const { cards, modeType } = props;

  return (
    <>
      <div className="flex items-center justify-center gap-2 mb-1">
        <h2 className="text-lg text-center font-bold">Discard Pile</h2>
      </div>
      <AnimatePresence>
        <div className={cn('md:w-2/4 lg:w-1/2 space-y-5 mx-auto')}>
          <div className="grid grid-cols-1 gap-4">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                className="aspect-[3/4] overflow-hidden transition-transform relative group grayscale pointer-events-none"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  layout
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                  className="p-5"
                >
                  {' '}
                  <ABCardComp card={card} modeType={modeType} />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatePresence>
    </>
  );
}
