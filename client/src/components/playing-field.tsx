'use client';

import { Fragment, useEffect, useState } from 'react';
import { IGridCell } from '@annabelle/shared/core/grid-cell';
import { ABCards, AnyABCard } from '@annabelle/shared/core/word';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { motion } from 'framer-motion';
import { ABCardFaceUp } from '@/components/ab-card';
import { DiscardPile } from '@/components/discard-pile';
import { GridCell } from '@/components/grid-cell';
import Placeholder from '@/components/placeholder';
import SectionCard from '@/components/section-card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import settingsStore from '@/stores/settings';

type Props = {
  modeInfo: {
    title: string;
    description: string;
    gridSize: number;
    className: string;
  };
  playerCards: ABCards;
};

export default function PlayingField(props: Props) {
  const { playerCards, modeInfo } = props;
  const { title, description, gridSize, className } = modeInfo;
  const { labelNotValue } = settingsStore();
  const [grid, setGrid] = useState<IGridCell[][]>([]);

  useEffect(() => {
    initializeGrid();
  }, []);

  const initializeGrid = () => {
    const newGrid: IGridCell[][] = Array(gridSize)
      .fill(null)
      .map((_, rowIndex) =>
        Array(gridSize)
          .fill(null)
          .map((_, columnIndex) => ({
            id: `cell-${rowIndex}-${columnIndex}`,
            rowIndex,
            columnIndex,
            card: null,
          }))
      );
    setGrid(newGrid);
  };

  if (!(playerCards.length > 0)) {
    return <Placeholder />;
  }

  return (
    <div className="flex w-full mx-auto items-center justify-center">
      <SectionCard
        title={title}
        description={description}
        className="flex flex-col text-center text-white p-4"
      >
        <div className="p-4 sm:p-8 flex flex-wrap gap-2 sm:gap-4 items-center justify-start -mt-5">
          <div className="flex flex-col sm:flex-row gap-8">
            <div className={cn('grid gap-2 bg-amber-950/30 rounded-2xl p-8', className)}>
              <div></div>
              {Array.from({ length: gridSize }, (_, colIndex) => (
                <motion.div
                  key={`col-${colIndex}`}
                  className="text-center font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  $0
                </motion.div>
              ))}

              {grid.map((row, rowIndex) => (
                <Fragment key={`row-${rowIndex}`}>
                  <motion.div
                    className="flex items-center justify-end font-semibold pr-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Royal Flush
                    <br />
                    $1000
                  </motion.div>
                  {row.map((cell) => (
                    <GridCell key={cell.id} cell={cell} />
                  ))}
                </Fragment>
              ))}
            </div>

            <div className=" bg-amber-950/30 rounded-2xl p-8">
              <DiscardPile cards={[]} />
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-8">
          <div className="flex-[1_1_auto] basis-auto max-w-[70%] mt-7">
            <div className="flex flex-row items-center justify-center gap-4">
              <SortableContext
                items={playerCards.map((item) => item.id)}
                strategy={horizontalListSortingStrategy}
              >
                {(playerCards as ABCards).map((item: AnyABCard) => (
                  <ABCardFaceUp key={item.id} card={item} valueNotLabel={!labelNotValue} />
                ))}
              </SortableContext>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Button onClick={() => null} disabled={true} className="mt-8">
              Discard
            </Button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
