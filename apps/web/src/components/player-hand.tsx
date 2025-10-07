'use client';

import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { ABCards } from '@untitled-card-game/shared';
import ABCardComp from '@/components/ab-card';
import SortableItem from '@/components/sortable-item';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const PlayerHand = ({
  playerHand,
  isDealing,
  rankLabel,
  modeType,
  playerHandClass,
  playerHandText,
}: {
  playerHand: ABCards;
  isDealing: boolean;
  rankLabel: boolean;
  modeType: 'abpoker';
  playerHandClass: string;
  playerHandText: string;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="hidden md:flex items-center justify-center mt-5">
        <h2 className="text-sm text-center font-bold text-white">{playerHandText}</h2>
      </div>
      {isDealing ? (
        <div className="flex items-center justify-center">
          <Loader2 className="size-4 animate-spin my-2" />
        </div>
      ) : (
        <div className={cn(playerHandClass)}>
          <SortableContext
            items={playerHand.map((item) => item.id)}
            strategy={horizontalListSortingStrategy}
          >
            {playerHand.map((item) => (
              <SortableItem key={item.id} id={item.id}>
                <ABCardComp
                  key={`card-${item.id}`}
                  card={item}
                  rankLabel={!rankLabel}
                  modeType={modeType}
                  hover={true}
                  isDragging
                  inGrid={false}
                />
              </SortableItem>
            ))}
          </SortableContext>
        </div>
      )}
    </div>
  );
};

export default PlayerHand;
