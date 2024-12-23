'use client';

import { Card } from '@annabelle/shared/src/interfaces/card';
import { cn } from '@/lib/utils';

export function ABCard({ rank, suit, letter, className }: Card) {
  return (
    <div
      className={cn(
        'relative w-40 h-56 sm:w-64 sm:h-96 cursor-pointer preserve-3d',
        'transition-transform duration-500 hover:scale-105',
        className
      )}
    >
      <div className="absolute inset-0 w-full h-full rounded-xl shadow-lg border-2 border-border preserve-3d">
        <ABCardFace rank={rank} suit={suit} letter={letter} />
      </div>
    </div>
  );
}

export function ABCardFace({ rank, suit, letter, className }: Card) {
  return (
    <div
      className={cn(
        'absolute inset-0 w-full h-full bg-white rounded-xl p-4',
        'backface-hidden no-select',
        className
      )}
    >
      <div className={cn('absolute top-2 left-2 text-base sm:text-xl font-bold', suit.className)}>
        <div>{rank}</div>
        <div>{suit.sign}</div>
      </div>

      <div
        className={cn(
          'absolute bottom-2 right-2 text-base sm:text-xl font-bold rotate-180',
          suit.className
        )}
      >
        <div>{rank}</div>
        <div>{suit.sign}</div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <span className={cn('text-4xl sm:text-6xl font-bold', suit.className)}>{letter}</span>
      </div>
    </div>
  );
}
