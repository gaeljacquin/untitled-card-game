'use client';

import { ABCards } from '@annabelle/shared/core/card';
import { IABModeType } from '@annabelle/shared/core/mode';
import { AnimatePresence, motion } from 'framer-motion';
import ABCardComp from '@/components/ab-card';
import { cn } from '@/lib/utils';

interface Props {
  cards: ABCards;
  modeType: IABModeType;
  valueNotLabel: boolean;
}

export default function DiscardPile(props: Props) {
  const { cards, modeType, valueNotLabel } = props;

  return (
    <>
      <div className="flex items-center justify-center gap-2 mb-2">
        <h2 className="text-sm text-center font-bold">Discard Pile</h2>
      </div>
      <AnimatePresence>
        <div className={cn('flex items-center justify-center')}>
          <div className="grid grid-cols-1 sm:grid-rows-1 gap-4 flex flex-row sm:flex-col">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                className="overflow-hidden transition-transform relative group brightness-50 pointer-events-none"
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
                >
                  <ABCardComp
                    card={card}
                    modeType={modeType}
                    valueNotLabel={valueNotLabel}
                    inGrid={false}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatePresence>
    </>
  );
}
