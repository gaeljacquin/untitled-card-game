'use client';

import { AnyABCard } from '@annabelle/shared/core/word';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  cards: AnyABCard[];
}

export function DiscardPile(props: Props) {
  void props;

  return (
    <div className="w-full">
      <motion.div
        className="top-0 left-0 right-0 text-center text-md font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Discard pile
      </motion.div>
      <div className="h-auto mt-8">
        <AnimatePresence>
          <></>
        </AnimatePresence>
      </div>
    </div>
  );
}
