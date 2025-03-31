'use client';

import { ABCards } from '@untitled-card-game/shared/core/card';
import { IABModeType } from '@untitled-card-game/shared/core/mode';
import ABCardComp from 'components/ab-card';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from 'lib/utils';

interface Props {
  cards: ABCards;
  modeType: IABModeType;
  rankLabel: boolean;
}

export default function DiscardPile(props: Props) {
  const { cards, modeType, rankLabel } = props;
  const discardPileText = 'Discard Pile';

  return (
    <div className="sm:sticky sm:top-0 h-auto bg-amber-950/30 rounded-2xl p-2 md:p-4 shadow-md">
      <div className="flex items-center justify-center gap-2 mb-2 sm:hidden">
        <h2 className="text-sm text-center font-bold">{discardPileText}</h2>
      </div>
      <div className="flex flex-row flex-wrap sm:flex-col gap-2 sm:gap-4 justify-center">
        <div className="flex items-center justify-center gap-2 mb-2 hidden sm:block">
          <h2 className="text-sm text-center font-bold">{discardPileText}</h2>
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
                      rankLabel={rankLabel}
                      inGrid={false}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
