'use client';

import Image from 'next/image';
import { ABCard } from '@annabelle/shared/core/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import settingsStore from '@/stores/settings';
import allConstants from '@/utils/constants';

type Props = {
  card: ABCard;
  preview?: boolean;
  valueNotLabel?: boolean;
};

export function ABCardFaceUp(props: Props) {
  const { card, preview, valueNotLabel } = props;
  const rank = card.rank;
  const suit = card.suit;
  const letter = card.letter;
  const { cardFront: cardFrontIndex } = settingsStore();
  const { cardFronts } = allConstants;
  const cardFront = cardFronts[cardFrontIndex];
  const cardColor = suit.isRed
    ? { text: 'text-red-500', letter: 'text-red-500', fill: 'fill-red-500' }
    : { text: 'text-black', letter: 'text-black', fill: 'fill-black' };
  let ShapeIcon = null;

  if (cardFront.id !== 'default') {
    ShapeIcon = cardFront.component;
    cardColor.letter = 'text-white';
  }

  return (
    <div
      className={cn(
        'relative cursor-pointer preserve-3d',
        'transition-transform duration-500',
        'w-32 h-48 hover:scale-105',
        preview ? 'w-48 h-72' : 'w-36 h-56 hover:scale-105'
      )}
    >
      <div className="absolute inset-0 w-full h-full rounded-xl shadow-lg border-2 border-border preserve-3d">
        <div
          className={cn(
            'absolute inset-0 w-full h-full bg-white rounded-xl p-4',
            'backface-hidden no-select'
          )}
        >
          <div
            className={cn('absolute top-2 left-2 text-base sm:text-xl font-bold', cardColor.text)}
          >
            <div>{valueNotLabel ? rank.value : rank.label}</div>
            <div>{suit.sign}</div>
          </div>

          <div
            className={cn(
              'absolute bottom-2 right-2 text-base sm:text-xl font-bold rotate-180',
              cardColor.text
            )}
          >
            <div>{valueNotLabel ? rank.value : rank.label}</div>
            <div>{suit.sign}</div>
          </div>

          <div className="relative flex items-center justify-center h-full w-full">
            {ShapeIcon && (
              <ShapeIcon
                className={cn(
                  'h-auto absolute',
                  preview ? 'w-40' : 'w-24',
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
                preview ? 'text-4xl sm:text-6xl' : 'text-2xl sm:text-4xl'
              )}
            >
              {letter}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ABCardFaceDown() {
  const { cardBack } = settingsStore();
  const { cardBacks } = allConstants;

  return (
    <div className={cn('relative w-36 h-56 cursor-pointer preserve-3d', 'scale-105')}>
      <div className="absolute inset-0 w-full h-full rounded-xl shadow-lg preserve-3d">
        <div
          className={cn(
            'absolute inset-0 w-full h-full bg-white rounded-xl p-4',
            'backface-hidden no-select'
          )}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Image
                  src={cardBacks[cardBack]}
                  alt="Card Back"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
              </TooltipTrigger>
              <TooltipContent className="-mt-14 ml-8">Deal</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
