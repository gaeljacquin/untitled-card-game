'use client';

import { Fragment, useEffect, useState } from 'react';
import { IGridCell } from '@annabelle/shared/core/grid-cell';
import { ABMode } from '@annabelle/shared/core/mode';
import { ABCards, AnyABCard } from '@annabelle/shared/core/word';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { motion } from 'framer-motion';
import { ABCardFaceUp } from '@/components/ab-card';
import { DiscardPile } from '@/components/discard-pile';
import { GridCell } from '@/components/grid-cell';
import Placeholder from '@/components/placeholder';
import SectionCard from '@/components/section-card';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import settingsStore from '@/stores/settings';

type Props = {
  modeSlug: string;
  abCards: ABCards;
  gridClass: string;
};

export default function PlayingField(props: Props) {
  const { modeSlug, abCards, gridClass } = props; // passing gridClass prop with the grid size hardcoded as Tailwind does not like dynamic class names
  const mode = ABMode.getMode(modeSlug)!;
  const { title, description, gridSize } = mode;
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

  if (!(abCards.length > 0)) {
    return <Placeholder />;
  }

  return (
    <div className="flex w-full mx-auto items-center justify-center">
      <SectionCard
        title={title}
        description={description}
        className="flex flex-col text-center text-white p-4"
      >
        <div className="p-4 sm:p-8 flex flex-wrap items-center justify-center -mt-5">
          <div className="flex flex-col sm:flex-row gap-8">
            <div className={cn(gridClass, 'gap-2 bg-amber-950/30 rounded-2xl p-8')}>
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
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-8">
          <div className="flex flex-col items-center justify-center gap-8 mt-8">
            <Popover>
              <PopoverTrigger asChild>
                <Button className="bg-green-800 hover:bg-green-700 border border-2 border-slate-400">
                  How to Play
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <p>How to Play instructions here</p>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="bg-sky-800 hover:bg-sky-700 border border-2 border-slate-400">
                  Discard Pile
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <DiscardPile cards={[]} />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex-[1_1_auto] basis-auto max-w-[70%] mt-7">
            <div className="flex flex-row items-center justify-center gap-4">
              <SortableContext
                items={abCards.map((item) => item.id)}
                strategy={horizontalListSortingStrategy}
              >
                {(abCards as ABCards).map((item: AnyABCard) => (
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
