'use client';

import Image from 'next/image';
import { Card } from '@annabelle/shared/src/core/card';
import { Club, Diamond, Heart, Spade } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import settingsStore from '@/stores/settings';
import allConstants from '@/utils/constants';

const suitMap = {
  spades: Spade,
  hearts: Heart,
  diamonds: Diamond,
  clubs: Club,
};

export function ABCardFaceUp({ rank, suit, letter }: Card) {
  const cardColor = suit.isRed
    ? { text: 'text-red-500', fill: 'fill-red-500' }
    : { text: 'text-black', fill: 'fill-black' };
  const SuitIcon = suitMap[suit.id as keyof typeof suitMap];

  return (
    <div
      className={cn(
        'relative w-32 h-48 cursor-pointer preserve-3d',
        'transition-transform duration-500 hover:scale-105'
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
            <div>{rank.label}</div>
            <div>{suit.sign}</div>
          </div>

          <div
            className={cn(
              'absolute bottom-2 right-2 text-base sm:text-xl font-bold rotate-180',
              cardColor.text
            )}
          >
            <div>{rank.label}</div>
            <div>{suit.sign}</div>
          </div>

          <div className="relative flex items-center justify-center h-full w-full">
            {SuitIcon && (
              <SuitIcon className={cn('w-24 h-auto absolute', cardColor.text, cardColor.fill)} />
            )}
            <span className={cn('text-4xl sm:text-6xl font-bold text-white uppercase', 'absolute')}>
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
    <div className={cn('relative w-32 h-48 cursor-pointer preserve-3d', 'scale-105')}>
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
                <Image src={cardBacks[cardBack]} alt="Card Back" layout="fill" objectFit="cover" />
              </TooltipTrigger>
              <TooltipContent className="-mt-14 ml-8">Deal</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
