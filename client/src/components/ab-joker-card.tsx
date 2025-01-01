'use client';

import { ABJoker } from '@annabelle/shared/src/core/card';
import { cn } from '@/lib/utils';

type Props = {
  preview?: boolean;
  randomLetter?: boolean;
  className?: string;
};

export default function ABJokerCard(props: Props) {
  const { preview, randomLetter } = props;
  const card = new ABJoker();
  const ShapeIcon = card.icon;
  const cardColor = {
    text: 'text-emerald-500',
    letter: 'text-emerald-500',
    fill: 'fill-emerald-500',
  };

  return (
    <div
      className={cn(
        'relative cursor-pointer',
        'w-32 h-48 hover:scale-105',
        preview ? 'w-48 h-72' : 'w-36 h-56 hover:scale-105',
        'shadow-animate rounded-xl'
      )}
    >
      <div className="w-full h-full rounded-xl shadow-lg border-2 border-border preserve-3d">
        <div className={cn('w-full h-full bg-white rounded-xl p-4', 'backface-hidden no-select')}>
          <div className="flex flex-col items-center justify-center h-full w-full gap-2">
            <ShapeIcon className={cn('h-auto', 'w-24', cardColor.letter)} />

            <span
              className={cn(
                'font-bold uppercase',
                cardColor.letter,
                preview ? 'text-4xl sm:text-6xl' : 'text-2xl sm:text-4xl'
              )}
            >
              {randomLetter && 'A'}
              {/* {letter} */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
