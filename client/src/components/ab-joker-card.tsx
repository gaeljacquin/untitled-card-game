'use client';

import { useState } from 'react';
import { ABJoker } from '@annabelle/shared/core/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
  preview?: boolean;
  className?: string;
};

export default function ABJokerCard(props: Props) {
  const { preview } = props;
  const card = new ABJoker();
  const Icon = card.icon;
  const cardColor = {
    text: 'text-emerald-500',
    letter: 'text-emerald-500',
    fill: 'fill-emerald-500',
  };
  const [uwu, setUwu] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={cn(
          'relative cursor-pointer preserve-3d',
          'transition-transform',
          'w-32 h-48 hover:scale-105',
          preview ? 'w-32 h-48 md:w-48 md:h-72' : 'w-36 h-56 hover:scale-105',
          'shadow-animate rounded-xl',
          'mb-8'
        )}
      >
        <div className="w-full h-full rounded-xl shadow-lg border-2 border-border preserve-3d">
          <div className={cn('w-full h-full bg-white rounded-xl p-4', 'backface-hidden no-select')}>
            <div className="flex flex-col items-center justify-center h-full w-full gap-2">
              <Icon className={cn('h-auto', 'w-12 md:w-24', cardColor.letter)} />
            </div>
          </div>
        </div>
      </div>
      {preview && (
        <>
          <div>
            <Button
              onClick={() => setUwu(!uwu)}
              className={cn('mb-2', 'scale-100 hover:scale-100')}
            >
              Show random icon*
            </Button>
          </div>
          <small>*Might show the same icon multiple times in a row</small>
        </>
      )}
    </div>
  );
}
