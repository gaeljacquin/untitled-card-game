'use client';

import { ABCards, IABModeType } from '@untitled-card-game/shared';
import { AnimatePresence, motion } from 'motion/react';

import ABCardComp from '@/components/ab-card';
import { cn } from '@/lib/utils';

export default function DiscardPile({
  cards,
  modeType,
  rankLabel,
  gameOver,
}: {
  cards: ABCards;
  modeType: IABModeType;
  rankLabel: boolean;
  gameOver: boolean;
}) {
  const discardPileText = 'Discard Pile';

  return (
    <div className="sm:sticky sm:top-0 h-auto bg-amber-950/30 rounded-2xl shadow-md p-2">
      <div className="flex items-center justify-center gap-2 mb-2 sm:hidden">
        <h2 className="text-sm text-center font-bold text-white">{discardPileText}</h2>
      </div>
      <div className="flex flex-row flex-wrap sm:flex-col gap-3 justify-center">
        <div className="flex items-center justify-center sm:block mt-4 mb-2">
          <h2 className="text-sm text-center font-bold text-white">{discardPileText}</h2>
        </div>
        <AnimatePresence>
          <div className={cn('flex items-center justify-center mb-4')}>
            <div className="flex flex-wrap flex-row sm:flex-col items-center justify-center gap-2">
              {cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  className="overflow-hidden relative group brightness-50 pointer-events-none"
                  initial={gameOver ? undefined : { opacity: 0, y: 50 }}
                  animate={gameOver ? undefined : { opacity: 1, y: 0 }}
                  transition={gameOver ? undefined : { duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.div
                    layout
                    transition={
                      gameOver ? undefined : { type: 'spring', stiffness: 300, damping: 30 }
                    }
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
