'use client';

import { ABCard } from '@annabelle/shared/src/core/card';
import { ABCardFaceDown, ABCardFaceUp } from '@/components/ab-card';
import SectionCard from '@/components/section-card';
import { Button } from '@/components/ui/button';
import settingsStore from '@/stores/settings';

type Props = {
  startingCard: ABCard;
  playerCards: ABCard[];
};

export default function PlayingField({ startingCard, playerCards }: Props) {
  const { labelNotValue } = settingsStore();

  return (
    <div className="flex flex-col w-full justify-between">
      <SectionCard title="" className="mt-7 rounded-3xl h-full">
        <>
          <div className="p-4 sm:p-8 flex flex-wrap gap-2 sm:gap-4 items-center justify-start">
            <ABCardFaceDown />
            <ABCardFaceUp {...startingCard} />
          </div>
          <hr />
          <div className="p-4 sm:p-8 flex flex-wrap gap-2 sm:gap-4 items-center justify-center">
            {playerCards.map((item) => (
              <ABCardFaceUp key={crypto.randomUUID()} {...item} valueNotLabel={!labelNotValue} />
            ))}
          </div>
        </>
        <div className="space-y-2 mt-4">
          <div className="flex flex-row items-center justify-center w-full gap-4">
            <Button variant="destructive" className="w-full">
              Discard
            </Button>
            <Button variant="default" className="w-full">
              Confirm
            </Button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
