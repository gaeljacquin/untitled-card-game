'use client';

import { Card } from '@annabelle/shared/src/interfaces/card';
import { Club, Diamond, Heart, Spade } from 'lucide-react';
import { cn } from '@/lib/utils';

const suitMap = {
  spades: Spade,
  hearts: Heart,
  diamonds: Diamond,
  clubs: Club,
};

export function ABCard({ rank, suit, letter }: Card) {
  return (
    <div
      className={cn(
        'relative w-40 h-56 sm:w-64 sm:h-96 cursor-pointer preserve-3d',
        'transition-transform duration-500 hover:scale-105'
      )}
    >
      <div className="absolute inset-0 w-full h-full rounded-xl shadow-lg border-2 border-border preserve-3d">
        <ABCardFace rank={rank} suit={suit} letter={letter} />
      </div>
    </div>
  );
}

export function ABCardFace({ rank, suit, letter }: Card) {
  const textColor = suit.isRed ? 'text-red-500' : 'text-black';
  const fillColor = suit.isRed ? 'fill-red-500' : 'fill-black';
  const SuitIcon = suitMap[suit.id as keyof typeof suitMap];

  return (
    <div
      className={cn(
        'absolute inset-0 w-full h-full bg-white rounded-xl p-4',
        'backface-hidden no-select'
      )}
    >
      <div className={cn('absolute top-2 left-2 text-base sm:text-xl font-bold', textColor)}>
        <div>{rank}</div>
        <div>{suit.sign}</div>
      </div>

      <div
        className={cn(
          'absolute bottom-2 right-2 text-base sm:text-xl font-bold rotate-180',
          textColor
        )}
      >
        <div>{rank}</div>
        <div>{suit.sign}</div>
      </div>

      <div className="relative flex items-center justify-center h-full w-full">
        {SuitIcon && <SuitIcon className={cn('w-32 h-auto absolute', textColor, fillColor)} />}
        <span className={cn('text-4xl sm:text-6xl font-bold text-white', 'absolute')}>
          {letter}
        </span>
      </div>
    </div>
  );
}
