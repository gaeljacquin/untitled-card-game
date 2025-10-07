'use client';

import { ABCard, suitIconMap, SuitId } from '@untitled-card-game/shared';
import { GiJesterHat } from 'react-icons/gi';

import { cn } from '@/lib/utils';
import { useUcgStore } from '@/stores/ucg-store';
import { abDesigns } from '@/utils/ab-designs';

export default function ABCardPreviewComp({
  card,
  className,
  rankLabel,
}: {
  card: ABCard;
  className?: string;
  rankLabel?: boolean;
}) {
  const rank = card.rank;
  const suit = card.suit;
  const { abDesignIndex } = useUcgStore();
  const cardFront = abDesigns[abDesignIndex];
  const isJoker = card.isJoker();
  const baseRank = isJoker ? card.getBaseRank() : rank;

  // Determine joker color based on base rank
  const isRedJoker = isJoker && baseRank.id === 'joker-red';

  const cardColor = isJoker
    ? isRedJoker
      ? { text: 'text-red-500', letter: 'text-red-500', fill: 'fill-red-500', bg: 'bg-red-500' }
      : { text: 'text-black', letter: 'text-black', fill: 'fill-black', bg: 'bg-black' }
    : suit.isRed
    ? { text: 'text-red-500', letter: 'text-red-500', fill: 'fill-red-500', bg: 'bg-red-500' }
    : { text: 'text-black', letter: 'text-black', fill: 'fill-black', bg: 'bg-black' };

  const SuitIcon = suitIconMap[suit.id as SuitId];
  let ShapeIcon = null;
  const rankDisplay = rankLabel ? rank.value : rank.label;
  const suitIconFill = cardFront.id === 'suitIcon';
  const main = rankDisplay;

  if (isJoker) {
    ShapeIcon = GiJesterHat;
    cardColor.letter = cardColor.text;
  } else if (suitIconFill) {
    ShapeIcon = suitIconMap[suit.id as SuitId];
    cardColor.text = 'text-white';
    cardColor.fill = 'fill-white';
  } else if (cardFront.id !== 'default') {
    ShapeIcon = cardFront.component;
    cardColor.letter = 'text-white';
  }

  return (
    <div
      className={cn(
        'relative cursor-pointer preserve-3d',
        'transition-transform duration-500',
        className
      )}
    >
      <div
        className={cn(
          'relative cursor-pointer preserve-3d',
          'transition-transform duration-500',
          'w-28 h-40 hover:scale-105'
        )}
      >
        <div className="absolute inset-0 w-full h-full">
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
              {!isJoker && (
                <>
                  <span className={cn('flex items-center justify-center uppercase', 'text-sm')}>
                    {main}
                  </span>
                  <SuitIcon className={cn('h-4 w-4')} />
                </>
              )}
              {isJoker && (
                <GiJesterHat className={cn('h-6 w-6', cardColor.text)} />
              )}
            </div>

            <div
              className={cn(
                'absolute bottom-2 right-2 text-base sm:text-xl font-bold rotate-180',
                cardColor.text
              )}
            >
              {!isJoker && (
                <>
                  <span className={cn('flex items-center justify-center uppercase', 'text-sm')}>
                    {main}
                  </span>
                  <SuitIcon className={cn('h-4 w-4')} />
                </>
              )}
              {isJoker && (
                <GiJesterHat className={cn('h-6 w-6', cardColor.text)} />
              )}
            </div>

            <div className="relative flex items-center justify-center h-full w-full">
              {ShapeIcon && (
                <ShapeIcon
                  className={cn(
                    'h-auto absolute',
                    isJoker ? 'w-24' : 'w-20',
                    cardFront.className,
                    cardColor.letter,
                    cardColor.fill
                  )}
                />
              )}
              {!isJoker && (
                <span
                  className={cn(
                    'font-bold uppercase',
                    'absolute',
                    cardColor.letter,
                    'text-2xl sm:text-4xl',
                    'flex-col-1 items-center justify-center'
                  )}
                >
                  <span
                    className={cn(
                      'flex items-center justify-center',
                      suitIconFill ? 'text-xl' : 'text-2xl'
                    )}
                  >
                    {main}
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
