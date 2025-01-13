'use client';

import { ABJoker } from '@annabelle/shared/core/card';
import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { GiDominoMask } from 'react-icons/gi';
import { cn } from '@/lib/utils';
import settingsStore, { cardFronts } from '@/stores/settings';

type Props = {
  card: ABJoker;
  isDragging?: boolean;
  className?: string;
  hover?: boolean;
  inGrid?: boolean;
};

export default function ABJokerComp(props: Props) {
  const { card, isDragging, hover = false, inGrid = true } = props;

  if (!card || !card.suit) {
    return null;
  }

  const { attributes, listeners, setNodeRef, active } = useDraggable({
    id: card.id,
  });
  const { cardFront: cardFrontIndex } = settingsStore();
  const cardFront = cardFronts[cardFrontIndex];

  const cardColor = {
    text: 'text-black',
    letter: 'text-black',
    fill: 'fill-cyan-700',
    bg: 'bg-gradient-to-br from-black via-orange-700 to-red-700',
  };
  let ShapeIcon = null;

  if (cardFront.id !== 'default') {
    ShapeIcon = cardFront.component;
    cardColor.letter = 'text-white';
  }

  const cardComp = () => {
    return (
      <div className="absolute inset-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={cn(
              'absolute inset-0 w-full h-full rounded-xl p-4',
              'backface-hidden no-select',
              cardFront.id === 'suitIcon' ? cardColor.bg : 'bg-white'
            )}
          >
            <div className={cn('absolute top-2 left-2 text-base sm:text-xl font-bold')}></div>

            <div
              className={cn(
                'absolute bottom-2 right-2 text-base text-sm sm:text-xl font-bold rotate-180'
              )}
            >
              <span
                className={cn('flex items-center justify-center uppercase', 'text-xs sm:text-sm')}
              ></span>
            </div>

            <div className="relative flex items-center justify-center h-full w-full">
              {ShapeIcon && (
                <ShapeIcon
                  className={cn(
                    'h-auto absolute',
                    'w-8 sm:w-20',
                    cardFront.className,
                    cardColor.letter,
                    cardColor.fill
                  )}
                />
              )}
              <span
                className={cn(
                  'font-bold uppercase',
                  'absolute',
                  cardColor.letter,
                  'text-2xl sm:text-4xl sm:p-2',
                  'flex-col-1 items-center justify-center'
                )}
              >
                <span className={cn('flex items-center justify-center')}>
                  <GiDominoMask />
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        'aspect-[3/4] overflow-hidden transition-transform relative group',
        !inGrid && 'flex-shrink-0 flex items-center justify-center w-16 sm:w-20 md:w-24',
        hover && 'hover:scale-105',
        active && card.id === active.id && isDragging && 'shadow-animate rounded-2xl'
      )}
    >
      {/* {inGrid ? gridCardComp() : cardComp()} */}
      {cardComp()}
    </motion.div>
  );
}
