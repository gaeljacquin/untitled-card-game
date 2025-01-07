'use client';

import Image from 'next/image';
import { suitIconMap } from '@annabelle/shared/constants/suit-icon';
import { ABCard } from '@annabelle/shared/core/card';
import { SuitId } from '@annabelle/shared/core/suit';
import { FaChessQueen } from 'react-icons/fa6';
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
  const { cardFront: cardFrontIndex, rankSwitchLetter } = settingsStore();
  const { cardFronts } = allConstants;
  const cardFront = cardFronts[cardFrontIndex];
  const cardColor = suit.isRed
    ? { text: 'text-red-500', letter: 'text-red-500', fill: 'fill-red-500', bg: 'bg-red-500' }
    : { text: 'text-black', letter: 'text-black', fill: 'fill-black', bg: 'bg-black' };
  const SuitIcon = suitIconMap[suit.id as SuitId];
  let ShapeIcon = null;
  const rankDisplay = valueNotLabel ? rank.value : rank.label;
  const main = rankSwitchLetter ? letter : rankDisplay;
  const sub = rankSwitchLetter ? rankDisplay : letter;
  const showUwu = !valueNotLabel && rank.aceFace;
  const suitIconFill = cardFront.id === 'suitIcon';

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
        preview ? 'w-48 h-72' : 'w-28 h-48 hover:scale-105'
      )}
    >
      <div className="absolute inset-0 w-full h-full rounded-xl shadow-lg border-2 border-border preserve-3d">
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
            <span className={cn('flex items-center justify-center', !preview && 'text-sm')}>
              {sub}
            </span>
            <SuitIcon className={cn(preview ? 'h-6 w-6' : 'h-4 w-4')} />
          </div>

          <div
            className={cn('absolute top-3 right-2 text-base sm:text-xl font-bold', cardColor.text)}
          >
            {showUwu && rankSwitchLetter && (
              <FaChessQueen className={cn(preview ? 'h-6 w-6' : 'h-4 w-4')} />
            )}
          </div>

          <div
            className={cn(
              'absolute bottom-2 right-2 text-base sm:text-xl font-bold rotate-180',
              cardColor.text
            )}
          >
            <span className={cn('flex items-center justify-center', !preview && 'text-sm')}>
              {sub}
            </span>
            <SuitIcon className={cn(preview ? 'h-6 w-6' : 'h-4 w-4')} />
          </div>

          <div
            className={cn(
              'absolute bottom-3 left-2 text-base sm:text-xl font-bold rotate-180',
              cardColor.text
            )}
          >
            {showUwu && rankSwitchLetter && (
              <FaChessQueen className={cn(preview ? 'h-6 w-6' : 'h-4 w-4')} />
            )}
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
                preview ? 'text-4xl sm:text-6xl' : 'text-2xl sm:text-4xl',
                'flex-col-1 items-center justify-center',
                suitIconFill && '-mt-4'
              )}
            >
              <span className={cn('flex items-center justify-center')}>
                {showUwu && !rankSwitchLetter && (
                  <FaChessQueen className={cn(suitIconFill ? 'h-4 w-4' : 'h-5 w-5')} />
                )}
              </span>
              <span className={cn('flex items-center justify-center', suitIconFill && 'text-4xl')}>
                {main}
              </span>
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
      <div className="absolute inset-0 w-full h-full preserve-3d">
        <div
          className={cn(
            'absolute inset-0 w-full h-full bg-transparent p-4',
            'backface-hidden no-select'
          )}
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Image
                  src={cardBacks[cardBack]}
                  alt="Card Back"
                  width={128}
                  height={128}
                  placeholder="blur"
                  blurDataURL={'/blur.png'}
                  className="rounded-2xl w-full h-48 object-contain"
                  style={{ objectFit: 'contain' }}
                  priority
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
