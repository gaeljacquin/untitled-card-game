'use client';

import { Fragment, ReactNode, useEffect, useState } from 'react';
import { ABCard, ABCards } from '@annabelle/shared/core/card';
import { IGridCell } from '@annabelle/shared/core/grid-cell';
import { ABMode } from '@annabelle/shared/core/mode';
import {
  calculateAvailableSpaces,
  // evaluatePokerHand,
} from '@annabelle/shared/functions/check-poker-hand';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { motion } from 'framer-motion';
import ABCardComp, { ABCardFaceUp } from '@/components/ab-card';
import DiscardPile from '@/components/discard-pile';
import GameOverModal from '@/components/game-over';
import { GridCell } from '@/components/grid-cell';
import HowToPlay from '@/components/how-to-play';
import Placeholder from '@/components/placeholder';
import SortableItem from '@/components/sortable-item';
import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import settingsStore from '@/stores/settings';
import { GameState } from '@/types/game-state';
import {
  canMoveCard,
  getGameState,
  // isGridFull
} from '@/utils/game-state';

type Props = {
  modeSlug: string;
  abCards: ABCards;
  gridClass: string;
  howToPlayText: () => ReactNode;
};

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const cardSizeClass = cn(
  'w-[60px] h-[84px] md:w-[100px] md:h-[140px]', // Adjust these values as needed
  'text-xs md:text-base' // Adjust font size for cards
);

export default function PlayingField(props: Props) {
  const { modeSlug, abCards, gridClass, howToPlayText } = props; // (1)
  const [playerHand, setPlayerHand] = useState<ABCards>([]);
  const mode = ABMode.getMode(modeSlug)!;
  const { title, description, gridSize, type } = mode;
  const { labelNotValue } = settingsStore();
  const [grid, setGrid] = useState<IGridCell[][]>([]);
  const [activeDrag, setActiveDrag] = useState<ABCard | null>(null);
  const [discardPile, setDiscardPile] = useState<ABCards>([]);
  const [gameState, setGameState] = useState<GameState>({
    gameOver: false,
    totalCards: abCards.length,
    playedCards: 0,
  });
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

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
    setDiscardPile(discardPile);
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

      const oldIdx = playerHand.findIndex((card) => card.id === event.active.id);
      const newIdx = playerHand.findIndex((card) => card.id === event.over!.id);

      if (sourceCell) {
        const newGrid = [...grid];
        newGrid[sourceCell.rowIndex][sourceCell.columnIndex].card = null;
        setGrid(newGrid);
        const newPlayerHand = [...playerHand]; // Create a copy of the player's hand
        newPlayerHand.splice(newIdx, 0, sourceCard); // Insert the card at the desired index
        setPlayerHand(newPlayerHand); // Update the player's hand
      } else {
        const newPlayerHand = arrayMove(playerHand, oldIdx, newIdx);
        setPlayerHand(newPlayerHand);
      }
    }

    setActiveDrag(null);
  };

  const handleDiscard = async () => {
    if (playerHand.length !== 1) return;

    const newGrid = grid.map((row) =>
      row.map((cell) => ({
        ...cell,
        card: cell.card ? { ...cell.card, isPlayed: true } : null,
      }))
    ) as IGridCell[][];

    setGrid(newGrid);

    const cardToDiscard = playerHand[0];
    setDiscardPile((prev) => [...prev, { ...cardToDiscard, faceUp: true }] as ABCards);
    setPlayerHand([]);

    const isGridFull = newGrid.every((row) => row.every((cell) => cell.card !== null));

    if (isGridFull) {
      setGameState((prev) => ({ ...prev, isGameOver: true }));
      return;
    }

    const gameState = getGameState(newGrid);

    // if (gameState.isGameOver) {
    setGameState(gameState);
    //   return;
    // }

    setTimeout(() => {
      setPlayerHand(abCards);

      abCards.forEach((_: unknown, index: number) => {
        setTimeout(() => {
          setPlayerHand((prev) =>
            prev.map((c, i) => (i === index ? ({ ...c, faceUp: true } as ABCard) : c))
          );
        }, index * 200);
      });
    }, 500);
  };

  if (!(abCards.length > 0)) {
    return <Placeholder />;
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="min-h-screen p-2 md:p-4 backdrop-blur-sm bg-white/10 border-white/20 rounded-2xl">
        <CardHeader className="text-white">
          <CardTitle className={cn('text-xl md:text-2xl')}>{title}</CardTitle>
          {description && (
            <CardDescription className="text-white/80 text-sm md:text-md">
              {description}
            </CardDescription>
          )}
        </CardHeader>

        {/* Main container with adjusted column widths */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          {/* Instructions Column */}
          <ScrollArea className="h-48 md:h-auto md:w-[20%] p-2 md:p-4 rounded-lg shadow-md md:max-h-[calc(100vh-4rem)] overflow-y-auto bg-amber-950/30 rounded-2xl">
            <HowToPlay content={howToPlayText} />
          </ScrollArea>

          {/* Main Card Grid and Player Hand Column - Enlarged */}
          <div className="md:w-[65%] flex flex-col space-y-2">
            {/* Grid Container - No scroll, scaled content */}
            <div
              className={cn(
                gridClass,
                'gap-1 md:gap-2 bg-amber-950/30 rounded-2xl p-2 md:p-4',
                'w-full'
              )}
            >
              {/* Your existing grid code */}
              <div></div>
              {Array.from({ length: gridSize }, (_, columnIndex) => (
                <motion.div
                  key={`col-${columnIndex}`}
                  className="text-center font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {/* $0 */}
                  Available: <br /> {calculateAvailableSpaces(grid, columnIndex, false)}
                </motion.div>
              ))}

              {grid.map((row, rowIndex) => (
                <Fragment key={`row-${rowIndex}`}>
                  <motion.div
                    className="flex items-center justify-end font-semibold pr-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {/* Royal Flush
                      <br />
                      $1000 */}
                    Available: <br /> {calculateAvailableSpaces(grid, rowIndex, true)}
                    {/* {evaluatePokerHand(row.map((element) => element.card))} */}
                  </motion.div>
                  {row.map((cell) => (
                    <GridCell key={cell.id} cell={cell} modeType={type} />
                  ))}
                </Fragment>
              ))}
            </div>

            <Separator />

            {/* Player Hand Container - No scroll, scaled content */}
            <div className="w-full">
              <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="flex flex-row items-center justify-center gap-4"
              >
                <SortableContext
                  items={playerHand.map((item) => item.id)}
                  strategy={horizontalListSortingStrategy}
                >
                  {playerHand.map((item) => (
                    <SortableItem key={item.id} id={item.id ?? 0}>
                      <ABCardComp
                        card={item}
                        valueNotLabel={!labelNotValue}
                        modeType={type}
                        className={cardSizeClass}
                        isDragging
                      />
                    </SortableItem>
                  ))}
                </SortableContext>
              </motion.div>
            </div>

            <div className="flex items-center justify-center">
              <Button onClick={handleDiscard} disabled={playerHand.length !== 1} className="mt-8">
                Next Round
              </Button>
            </div>
          </div>

          {/* Discard Pile Column - Reduced width */}
          <div className="h-48 md:h-auto md:w-[15%] bg-amber-950/30 rounded-2xl flex items-center justify-center p-2">
            <div className="h-full">
              <DiscardPile cards={discardPile} modeType={type} />
            </div>
          </div>
        </div>

        <DragOverlay
          dropAnimation={{
            duration: 500,
            easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
          }}
        >
          {activeDrag && (
            <ABCardFaceUp
              card={activeDrag}
              valueNotLabel={!labelNotValue}
              modeType={type}
              isDragging
            />
          )}
        </DragOverlay>

        <GameOverModal isOpen={gameState.gameOver} onRestart={initializeGame} />
      </div>
    </DndContext>
  );
}

/* Notes
(1) Passing gridClass prop with the grid size hardcoded as Tailwind does not like dynamic class names
 */
