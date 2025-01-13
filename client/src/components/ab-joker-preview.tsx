'use client';

import { ABJoker } from '@annabelle/shared/core/card';
import { IABModeType } from '@annabelle/shared/core/mode';
import { GiDominoMask } from 'react-icons/gi';
import { cn } from '@/lib/utils';
import settingsStore, { cardFronts } from '@/stores/settings';

type CardFrontProps = {
  card: ABJoker;
  className?: string;
};

export default function ABJokerPreview(props: CardFrontProps) {
  const { card, className } = props;

  return (
    <div
      className={cn(
        'relative cursor-pointer preserve-3d',
        'transition-transform duration-500',
        className
      )}
    >
      <ABCardFaceUp card={card} />
    </div>
  );
}

// Code from previous ABCard component
type ABCardFaceUpProps = {
  card: ABJoker;
  isDragging?: boolean;
  modeType?: IABModeType;
  className?: string;
};

// Code from previous ABCard component
function ABCardFaceUp(props: ABCardFaceUpProps) {
  // const { card } = props;
  void props;
  const { cardFront: cardFrontIndex } = settingsStore();
  const cardFront = cardFronts[cardFrontIndex];
  const cardColor = {
    text: 'text-black',
    letter: 'text-black',
    fill: 'fill-cyan-700',
    bg: 'bg-gradient-to-br from-black via-orange-700 to-red-700',
  };
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
        'w-28 h-40 hover:scale-105 shadow-animate-3 rounded-2xl'
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
          <div className={cn('absolute top-2 left-2 text-base sm:text-xl font-bold')}></div>

          <div
            className={cn('absolute bottom-2 right-2 text-base sm:text-xl font-bold rotate-180')}
          >
            <span className={cn('flex items-center justify-center uppercase', 'text-sm')}></span>
          </div>

          <div className="relative flex items-center justify-center h-full w-full">
            {ShapeIcon && (
              <ShapeIcon
                className={cn(
                  'h-auto absolute',
                  'w-20 sm:w-28',
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
                'text-2xl sm:text-4xl sm:p-2',
                'flex-col-1 items-center justify-center'
              )}
            >
              <span className={cn('flex items-center justify-center')}>
                <GiDominoMask />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
