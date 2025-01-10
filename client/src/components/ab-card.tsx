'use client';

import { suitIconMap } from '@annabelle/shared/constants/suit-icon';
import { ABCard } from '@annabelle/shared/core/card';
import { IABModeType } from '@annabelle/shared/core/mode';
import { SuitId } from '@annabelle/shared/core/suit';
import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { FaChessQueen } from 'react-icons/fa6';
import { cn } from '@/lib/utils';
import settingsStore, { cardFronts } from '@/stores/settings';

type Props = {
  card: ABCard;
  valueNotLabel?: boolean;
  isDragging?: boolean;
  modeType?: IABModeType;
  className?: string;
  hover?: boolean;
  outsideGrid?: boolean;
};

export default function ABCardComp(props: Props) {
  const { card, valueNotLabel, isDragging, modeType, hover = false, outsideGrid } = props;
  const { attributes, listeners, setNodeRef, active } = useDraggable({
    id: card.id,
  });
  const rank = card.rank;
  const suit = card.suit;
  const letter = card.letter;
  const { cardFront: cardFrontIndex } = settingsStore();
  const cardFront = cardFronts[cardFrontIndex];
  const cardColor = suit.isRed
    ? { text: 'text-red-500', letter: 'text-red-500', fill: 'fill-red-500', bg: 'bg-red-500' }
    : { text: 'text-black', letter: 'text-black', fill: 'fill-black', bg: 'bg-black' };
  const SuitIcon = suitIconMap[suit.id as SuitId];
  let ShapeIcon = null;
  const rankDisplay = valueNotLabel ? rank.value : rank.label;
  const showUwu = !valueNotLabel && rank.aceFace;
  const suitIconFill = cardFront.id === 'suitIcon';
  let main;
  let sub;

  if (modeType === 'abpoker') {
    main = rankDisplay;
    sub = letter;
  } else {
    main = letter;
    sub = rankDisplay;
  }

  if (suitIconFill) {
    ShapeIcon = suitIconMap[suit.id as SuitId];
    cardColor.text = 'text-white';
    cardColor.fill = 'fill-white';
  } else if (cardFront.id !== 'default') {
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
            <div
              className={cn('absolute top-2 left-2 text-base sm:text-xl font-bold', cardColor.text)}
            >
              <span
                className={cn('flex items-center justify-center uppercase', 'text-xs sm:text-sm')}
              >
                {sub}
              </span>
              <SuitIcon className={cn('h-2 w-2 sm:h-4 sm:w-4')} />
            </div>

            <div
              className={cn(
                'absolute top-3 right-2 text-base text-sm sm:text-xl font-bold',
                cardColor.text
              )}
            >
              {showUwu && modeType !== 'abpoker' && (
                <FaChessQueen className={cn('h-1 w-1 sm:h-3 sm:w-3')} />
              )}
            </div>

            <div
              className={cn(
                'absolute bottom-2 right-2 text-base text-sm sm:text-xl font-bold rotate-180',
                cardColor.text
              )}
            >
              <span
                className={cn('flex items-center justify-center uppercase', 'text-xs sm:text-sm')}
              >
                {sub}
              </span>
              <SuitIcon className={cn('h-2 w-2 sm:h-4 sm:w-4')} />
            </div>

            <div
              className={cn(
                'absolute bottom-3 left-2 text-base sm:text-xl font-bold rotate-180',
                cardColor.text
              )}
            >
              {showUwu && modeType !== 'abpoker' && (
                <FaChessQueen className={cn('h-1 w-1 sm:h-3 sm:w-3')} />
              )}
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
                  'text-xs sm:text-4xl',
                  'flex-col-1 items-center justify-center',
                  suitIconFill && !suit.isRed && '-mt-4' // (1)
                )}
              >
                <span className={cn('flex items-center justify-center')}>
                  {showUwu && modeType === 'abpoker' && (
                    <FaChessQueen className={cn('h-1 w-1 sm:h-4 sm:w-4')} />
                  )}
                </span>
                <span
                  className={cn(
                    'flex items-center justify-center',
                    suitIconFill ? 'text-sm sm:text-xl' : 'text-md sm:text-2xl'
                  )}
                >
                  {main}
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
        outsideGrid && 'flex-shrink-0 flex items-center justify-center w-24 sm:w-32 md:w-40',
        hover && 'hover:scale-105',
        active && card.id === active.id && isDragging && 'shadow-animate rounded-2xl'
      )}
    >
      {cardComp()}
    </motion.div>
  );
}

/* Notes
(1) Letter spacing is off when suit is set to clubs or spades.
 */
