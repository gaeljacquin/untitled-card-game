'use client';

import { useDraggable } from '@dnd-kit/core';
import { ABCard, IABModeType, suitIconMap, SuitId } from '@gaeljacquin/ucg-shared';
import { motion } from 'framer-motion';
import { cn } from 'lib/utils';
import { useUcgStore } from 'stores/main-store';
import { abDesigns } from 'utils/ab-designs';

export default function ABCardComp({
  card,
  rankLabel,
  isDragging,
  hover = false,
  inGrid = true,
}: {
  card: ABCard;
  rankLabel?: boolean;
  isDragging?: boolean;
  modeType?: IABModeType;
  className?: string;
  hover?: boolean;
  inGrid?: boolean;
}) {
  const { attributes, listeners, setNodeRef, active } = useDraggable({
    id: card.id,
  });
  const rank = card.rank;
  const suit = card.suit;
  const { abDesignIndex } = useUcgStore();
  const abDesign = abDesigns[abDesignIndex];

  // Part of the race condition fix
  if (!card || !card.suit) {
    return null;
  }

  const cardColor = suit.isRed
    ? { text: 'text-red-500', letter: 'text-red-500', fill: 'fill-red-500', bg: 'bg-red-500' }
    : { text: 'text-black', letter: 'text-black', fill: 'fill-black', bg: 'bg-black' };
  const SuitIcon = suitIconMap[suit.id as SuitId];
  let ShapeIcon = null;
  const rankDisplay = rankLabel ? rank.value : rank.label;
  const suitIconFill = abDesign.id === 'suitIcon';

  if (suitIconFill) {
    ShapeIcon = suitIconMap[suit.id as SuitId];
    cardColor.text = 'text-white';
    cardColor.fill = 'fill-white';
  } else if (abDesign.id !== 'default') {
    ShapeIcon = abDesign.component;
    cardColor.letter = 'text-white';
  }

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        'aspect-3/4 overflow-hidden transition-transform relative group',
        !inGrid && 'shrink-0 flex items-center justify-center w-16 sm:w-20 md:max-w-24',
        hover && 'hover:scale-105',
        active && card.id === active.id && isDragging && 'shadow-animate rounded-2xl',
        inGrid && card.played && 'invert-30'
      )}
    >
      return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={cn(
            'absolute inset-0 w-full h-full rounded-xl p-4',
            'backface-hidden no-select',
            abDesign.id === 'suitIcon' ? cardColor.bg : 'bg-white'
          )}
        >
          <div className={cn('absolute top-2 left-2 text-xs sm:text-md font-bold', cardColor.text)}>
            <span
              className={cn('flex items-center justify-center uppercase', 'text-xs lg:text-sm')}
            >
              {rankDisplay}
            </span>
            <SuitIcon className={cn('size-2 sm:size-3')} />
          </div>

          <div
            className={cn(
              'absolute bottom-2 right-2 text-base text-xs sm:text-md font-bold rotate-180',
              cardColor.text
            )}
          >
            <span
              className={cn('flex items-center justify-center uppercase', 'text-xs lg:text-sm')}
            >
              {rankDisplay}
            </span>
            <SuitIcon className={cn('size-2 sm:size-3')} />
          </div>

          <div className="relative flex items-center justify-center h-full w-full">
            {ShapeIcon && (
              <ShapeIcon
                className={cn(
                  'h-auto absolute',
                  'w-8 sm:w-14 md:max-w-20',
                  abDesign.className,
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
                'text-xs sm:text-lg',
                'flex-col-1 items-center justify-center',
                suitIconFill && !suit.isRed && '-mt-4' // Letter spacing is off when suit is set to clubs or spades.
              )}
            >
              <span
                className={cn(
                  'flex items-center justify-center',
                  suitIconFill ? 'text-sm sm:text-lg' : 'text-md sm:text-xl'
                )}
              >
                {rankDisplay}
              </span>
            </span>
          </div>
        </div>
      </div>
      );
    </motion.div>
  );
}
