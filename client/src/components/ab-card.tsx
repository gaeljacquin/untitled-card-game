'use client';

import Image from 'next/image';
import { suitIconMap } from '@annabelle/shared/constants/suit-icon';
import { ABCard } from '@annabelle/shared/core/card';
import { IABModeType } from '@annabelle/shared/core/mode';
import { SuitId } from '@annabelle/shared/core/suit';
import { useDraggable } from '@dnd-kit/core';
import { motion } from 'framer-motion';
import { FaChessQueen } from 'react-icons/fa6';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import settingsStore, { cardBacks, cardFronts } from '@/stores/settings';

type Props = {
  card: ABCard;
  preview?: boolean;
  valueNotLabel?: boolean;
  isDragging?: boolean;
  modeType?: IABModeType;
  className?: string;
};

export default function ABCardComp(props: Props) {
  const { card, preview, valueNotLabel, isDragging, modeType, className } = props;
  const { attributes, listeners, setNodeRef, active } = useDraggable({
    id: card.id,
  });

  return (
    <motion.div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        className ?? '',
        active && card.id === active.id && isDragging && 'shadow-animate rounded-2xl'
      )}
    >
      {card.faceUp ? (
        <ABCardFaceUp
          card={card}
          preview={preview}
          valueNotLabel={valueNotLabel}
          modeType={modeType}
        />
      ) : (
        <ABCardFaceDown />
      )}
    </motion.div>
  );
}

export function ABCardFaceUp(props: Props) {
  const { card, preview, valueNotLabel, modeType } = props;
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

  if (preview) {
    if (rankSwitchLetter) {
      main = letter;
      sub = rankDisplay;
    } else {
      main = rankDisplay;
      sub = letter;
    }
  } else {
    if (modeType === 'abpoker') {
      main = rankDisplay;
      sub = letter;
    } else {
      main = letter;
      sub = rankDisplay;
    }
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
            {showUwu && ((preview && rankSwitchLetter) || modeType !== 'abpoker') && (
              <FaChessQueen className={cn('h-3 w-3')} />
            )}
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
            {showUwu && ((preview && rankSwitchLetter) || modeType !== 'abpoker') && (
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
                {showUwu && (!(preview && rankSwitchLetter) || modeType === 'abpoker') && (
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

export function ABCardFaceDown() {
  const { cardBack } = settingsStore();

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

/* Notes
(1) Letter spacing is off when suit is set to clubs or spades.
 */
