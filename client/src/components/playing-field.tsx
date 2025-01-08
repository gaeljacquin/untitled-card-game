'use client';

import { Fragment, useEffect, useState } from 'react';
import { ABCard, ABCards } from '@annabelle/shared/core/card';
import { IGridCell } from '@annabelle/shared/core/grid-cell';
import { ABMode } from '@annabelle/shared/core/mode';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { motion } from 'framer-motion';
import { GrHelpBook } from 'react-icons/gr';
import { IoMdSettings } from 'react-icons/io';
import { TbCardsFilled } from 'react-icons/tb';
import { ABCardFaceUp } from '@/components/ab-card';
import { DiscardPile } from '@/components/discard-pile';
import GameOverModal from '@/components/game-over';
import { GridCell } from '@/components/grid-cell';
import Placeholder from '@/components/placeholder';
import { PlayerHand } from '@/components/player-hand';
import SectionCard from '@/components/section-card';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import settingsStore from '@/stores/settings';
import { GameState } from '@/types/game-state';
import { canMoveCard, getGameState, isGridFull } from '@/utils/game-state';

type Props = {
  modeSlug: string;
  abCards: ABCards;
  gridClass: string;
};

export default function PlayingField(props: Props) {
  const { modeSlug, abCards, gridClass } = props; // (1)
  const [playerHand, setPlayerHand] = useState<ABCards>([]);
  const mode = ABMode.getMode(modeSlug)!;
  const { title, description, gridSize } = mode;
  const { labelNotValue } = settingsStore();
  const [grid, setGrid] = useState<IGridCell[][]>([]);
  const [activeDrag, setActiveDrag] = useState<ABCard | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    gameOver: false,
    totalCards: abCards.length,
    playedCards: 0,
  });

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    setGameState(getGameState(grid));
  }, [grid]);

  const initializeGame = () => {
    setTimeout(() => {
      abCards.forEach((card, index) => {
        setTimeout(() => {
          setPlayerHand((prev) => [
            ...prev.slice(0, index),
            { ...abCards[index], faceUp: true } as ABCard,
            ...prev.slice(index + 1),
          ]);
        }, index * 200);
      });
    }, 500);
    setPlayerHand(abCards);

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
    // setDiscardPile([]);
    setGameState({ gameOver: false, totalCards: gridSize * gridSize, playedCards: 0 });
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const card =
      playerHand.find((c) => c.id === active.id) ||
      grid.flat().find((cell) => cell.card?.id === active.id)?.card;

    if (card && canMoveCard(card, playerHand)) {
      setActiveDrag(card);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !activeDrag) {
      setActiveDrag(null);
      return;
    }

    const sourceCard = activeDrag;

    if (over.data.current?.type === 'grid') {
      const { rowIndex, columnIndex } = over.data.current;
      const newGrid = [...grid];

      if (playerHand.includes(sourceCard)) {
        if (playerHand.length === 1 && !newGrid[rowIndex][columnIndex].card) {
          setActiveDrag(null);
          return;
        }

        if (newGrid[rowIndex][columnIndex].card) {
          const targetCard = newGrid[rowIndex][columnIndex].card! as ABCard;
          if (!targetCard.played && playerHand.length === 1) {
            newGrid[rowIndex][columnIndex].card = { ...sourceCard, faceUp: true } as ABCard;
            setPlayerHand((prev) =>
              prev.map((c) =>
                c.id === sourceCard.id ? ({ ...targetCard, faceUp: true } as ABCard) : c
              )
            );
          }
        } else {
          newGrid[rowIndex][columnIndex].card = { ...sourceCard, faceUp: true } as ABCard;
          setPlayerHand((prev) => prev.filter((c) => c.id !== sourceCard.id));
        }
      } else if (!sourceCard.played) {
        const sourceCell = grid.flat().find((cell) => cell.card?.id === active.id);
        if (sourceCell) {
          const targetCard = newGrid[rowIndex][columnIndex].card;
          if (!targetCard?.played) {
            newGrid[sourceCell.rowIndex][sourceCell.columnIndex].card = targetCard;
            newGrid[rowIndex][columnIndex].card = sourceCard;
          }
        }
      }
      setGrid(newGrid);
    } else if (over.data.current?.type === 'hand' && !sourceCard.played) {
      const sourceCell = grid.flat().find((cell) => cell.card?.id === active.id);
      if (sourceCell) {
        const newGrid = [...grid];
        newGrid[sourceCell.rowIndex][sourceCell.columnIndex].card = null;
        setGrid(newGrid);
        setPlayerHand((prev) => [...prev, sourceCard]);
      }
    }
    setActiveDrag(null);
  };

  if (!(abCards.length > 0)) {
    return <Placeholder />;
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex w-full max-w-4xl mx-auto items-center justify-center">
        <SectionCard
          title={title}
          description={description}
          className="flex flex-col text-center text-white p-4 w-full max-w-5xl mx-auto"
        >
          <div className="flex flex-row items-center justify-center gap-8 mb-4">
            <Popover>
              <PopoverTrigger asChild>
                <IoMdSettings size={48} color="white" className="hover:cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <p>Settings go here</p>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <GrHelpBook size={48} className="hover:cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                  <p>Instructions go here</p>
                </div>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <TbCardsFilled size={48} color="white" className="hover:cursor-pointer" />
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <DiscardPile cards={[]} />
              </PopoverContent>
            </Popover>
          </div>

          <div className="p-4 sm:p-8 flex flex-wrap items-center justify-center -mt-5">
            <div className="flex flex-col sm:flex-row gap-8">
              <div className={cn(gridClass, 'gap-2 bg-amber-950/30 rounded-2xl p-8')}>
                <div></div>
                {Array.from({ length: gridSize }, (_, columnIndex) => (
                  <motion.div
                    key={`col-${columnIndex}`}
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

          <div className="flex flex-[1_1_auto] basis-auto items-center justify-center gap-8">
            <div className="flex-[1_1_auto] basis-auto max-w-[70%] mt-7">
              <div className="flex flex-row items-center justify-center gap-4">
                <SortableContext
                  items={abCards.map((item) => item.id)}
                  strategy={horizontalListSortingStrategy}
                >
                  <PlayerHand cards={playerHand} />
                </SortableContext>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mt-2">
            <Button onClick={() => null} disabled={true} className="mt-8">
              Next Round
            </Button>
          </div>
        </SectionCard>
      </div>

      <DragOverlay
        dropAnimation={{
          duration: 300,
          easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
        }}
      >
        {activeDrag && <ABCardFaceUp card={activeDrag} valueNotLabel={!labelNotValue} isDragging />}
      </DragOverlay>

      <GameOverModal isOpen={gameState.gameOver} onRestart={initializeGame} />
    </DndContext>
  );
}

/* Notes
(1) Passing gridClass prop with the grid size hardcoded as Tailwind does not like dynamic class names
 */
