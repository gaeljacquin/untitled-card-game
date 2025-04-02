'use client';

import { suitIconMap } from '@untitled-card-game/shared/constants/suit-icon';
import { ABCard } from '@untitled-card-game/shared/core/card';
import { SuitId } from '@untitled-card-game/shared/core/suit';
import { cn } from 'lib/utils';
import settingsStore from 'stores/settings';
import { abDesigns } from 'utils/ab-designs';

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
  const { abDesignIndex } = settingsStore();
  const cardFront = abDesigns[abDesignIndex];
  const cardColor = suit.isRed
    ? { text: 'text-red-500', letter: 'text-red-500', fill: 'fill-red-500', bg: 'bg-red-500' }
    : { text: 'text-black', letter: 'text-black', fill: 'fill-black', bg: 'bg-black' };
  const SuitIcon = suitIconMap[suit.id as SuitId];
  let ShapeIcon = null;
  const rankDisplay = rankLabel ? rank.value : rank.label;
  const suitIconFill = cardFront.id === 'suitIcon';
  const main = rankDisplay;

  if (suitIconFill) {
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
              <span className={cn('flex items-center justify-center uppercase', 'text-sm')}>
                {main}
              </span>
              <SuitIcon className={cn('h-4 w-4')} />
            </div>

            <div
              className={cn(
                'absolute bottom-2 right-2 text-base sm:text-xl font-bold rotate-180',
                cardColor.text
              )}
            >
              <span className={cn('flex items-center justify-center uppercase', 'text-sm')}>
                {main}
              </span>
              <SuitIcon className={cn('h-4 w-4')} />
            </div>

            <div className="relative flex items-center justify-center h-full w-full">
              {ShapeIcon && (
                <ShapeIcon
                  className={cn(
                    'h-auto absolute',
                    'w-20',
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
