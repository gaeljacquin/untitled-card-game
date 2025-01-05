'use client';

import { ABCard } from '@annabelle/shared/core/card';
import { ABCards, AnyABCard } from '@annabelle/shared/core/word';
import { ABCardFaceDown, ABCardFaceUp } from '@/components/ab-card';
import SectionCard from '@/components/section-card';
import settingsStore from '@/stores/settings';
import Placeholder from './placeholder';

type Props = {
  startingCard: ABCard;
  playerCards: ABCard[];
};

export default function PlayingField(props: Props) {
  const { startingCard, playerCards } = props;
  const { labelNotValue } = settingsStore();

  if (!(startingCard && playerCards.length > 0)) {
    return <Placeholder />;
  }

  return (
    <div className="flex flex-col w-full justify-between">
      <SectionCard title="" className="mt-7 rounded-3xl h-full">
        <div className="p-4 sm:p-8 flex flex-wrap gap-2 sm:gap-4 items-center justify-start">
          <ABCardFaceDown />
          <ABCardFaceUp card={startingCard as ABCard} valueNotLabel={!labelNotValue} />
        </div>
        <hr />
        <div className="p-4 sm:p-8 flex flex-wrap gap-2 sm:gap-4 items-center justify-center">
          {(playerCards as ABCards).map((item: AnyABCard) => (
            <ABCardFaceUp key={crypto.randomUUID()} card={item} valueNotLabel={!labelNotValue} />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
