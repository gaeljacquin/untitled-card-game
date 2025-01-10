'use client';

import Image from 'next/image';
import { suitIconMap } from '@annabelle/shared/constants/suit-icon';
import { ABCard } from '@annabelle/shared/core/card';
import { IABModeType } from '@annabelle/shared/core/mode';
import { SuitId } from '@annabelle/shared/core/suit';
import { FaChessQueen } from 'react-icons/fa6';
import { cn } from '@/lib/utils';
import settingsStore, { cardFronts } from '@/stores/settings';

type CardFrontProps = {
  card: ABCard;
  className?: string;
  valueNotLabel?: boolean;
};

type CardBackProps = {
  cardBack: string;
  index: number;
  isSelected: boolean;
};

export function CardFrontPreview(props: CardFrontProps) {
  const { card, className, valueNotLabel } = props;

  return (
    <div
      className={cn(
        'relative cursor-pointer preserve-3d',
        'transition-transform duration-500',
        className
      )}
    >
      <ABCardFaceUp card={card} valueNotLabel={valueNotLabel} />
    </div>
  );
}

export function CardBackPreview(props: CardBackProps) {
  const { cardBack, index, isSelected } = props;

  return (
    <div
      className={cn(
        'relative aspect-[4/5] rounded-2xl transition-all duration-300',
        'hover:scale-105 hover:shadow-2xl hover:shadow-white/10',
        'transform perspective-1000 cursor-pointer',
        isSelected && 'ring-4 ring-white/50 scale-105 rotate-3'
      )}
    >
      <Image
        src={cardBack}
        alt={'Card back ' + (index + 1)}
        width={128}
        height={128}
        placeholder="blur"
        blurDataURL={'/blur.png'}
        className="rounded-2xl w-full h-48 object-cover"
        style={{ objectFit: 'cover' }}
        priority
      />
    </div>
  );
}

// (1)
type ABCardFaceUpProps = {
  card: ABCard;
  valueNotLabel?: boolean;
  isDragging?: boolean;
  modeType?: IABModeType;
  className?: string;
};

// (1)
function ABCardFaceUp(props: ABCardFaceUpProps) {
  const { card, valueNotLabel, modeType } = props;
  const rank = card.rank;
  const suit = card.suit;
  const letter = card.letter;
  const { cardFront: cardFrontIndex, rankSwitchLetter } = settingsStore();
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

  if (rankSwitchLetter) {
    main = letter;
    sub = rankDisplay;
  } else {
    main = rankDisplay;
    sub = letter;
  }

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
              {sub}
            </span>
            <SuitIcon className={cn('h-4 w-4')} />
          </div>

          <div
            className={cn('absolute top-3 right-2 text-base sm:text-xl font-bold', cardColor.text)}
          >
            {showUwu && rankSwitchLetter && <FaChessQueen className={cn('h-3 w-3')} />}
          </div>

          <div
            className={cn(
              'absolute bottom-2 right-2 text-base sm:text-xl font-bold rotate-180',
              cardColor.text
            )}
          >
            <span className={cn('flex items-center justify-center uppercase', 'text-sm')}>
              {sub}
            </span>
            <SuitIcon className={cn('h-4 w-4')} />
          </div>

          <div
            className={cn(
              'absolute bottom-3 left-2 text-base sm:text-xl font-bold rotate-180',
              cardColor.text
            )}
          >
            {showUwu && (rankSwitchLetter || modeType !== 'abpoker') && (
              <FaChessQueen className={cn('h-3 w-3')} />
            )}
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
                'flex-col-1 items-center justify-center',
                suitIconFill && !suit.isRed && '-mt-4' // (1)
              )}
            >
              <span className={cn('flex items-center justify-center')}>
                {showUwu && (!rankSwitchLetter || modeType === 'abpoker') && (
                  <FaChessQueen className={cn('h-4 w-4')} />
                )}
              </span>
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
  );
}

/* Notes
(1) Code from previous ABCard component
*/
