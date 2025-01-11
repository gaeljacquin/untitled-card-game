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
import ABCardComp from '@/components/ab-card';
import DiscardPile from '@/components/discard-pile';
import { GridCell } from '@/components/grid-cell';
import LiveScore from '@/components/live-score';
import Placeholder from '@/components/placeholder';
import SortableItem from '@/components/sortable-item';
import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  playerHandClass: string;
  howToPlayText: () => ReactNode;
  handleNextRound: (arg0: { [key: string]: unknown }) => void;
};

export default function PlayingField(props: Props) {
  const { modeSlug, abCards, howToPlayText, gridClass, playerHandClass, handleNextRound } = props; // (1)
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

          if (!targetCard.played) {
            newGrid[rowIndex][columnIndex].card = { ...sourceCard, faceUp: true } as ABCard;
            setPlayerHand((prev) => {
              const updatedHand = prev.filter((c) => c.id !== sourceCard.id);
              return [...updatedHand, { ...targetCard, faceUp: true } as ABCard];
            });
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
        const newPlayerHand = [...playerHand];
        newPlayerHand.splice(newIdx, 0, sourceCard);
        setPlayerHand(newPlayerHand);
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

    // const gameState = getGameState(newGrid);

    // if (gameState.isGameOver) {
    // setGameState(gameState);
    //   return;
    // }

    void gameState; // Temporary

    handleNextRound({ cardToDiscard, newGrid });
  };

  useEffect(() => {
    if (abCards && abCards.length > 0) {
      setPlayerHand(abCards);

      abCards.forEach((_, index) => {
        setTimeout(() => {
          setPlayerHand((prev) => [
            ...prev.slice(0, index),
            { ...prev[index], faceUp: true } as ABCard,
            ...prev.slice(index + 1),
          ]);
        }, index * 200);
      });
    }
  }, [abCards]);

  if (!(abCards.length > 0)) {
    return <Placeholder />;
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="min-h-screen backdrop-blur-sm bg-white/10 border-white/20 rounded-2xl p-4 md:p-8 ">
        <CardHeader className="text-white">
          <CardTitle className={cn('text-2xl md:text-3xl', '-mt-7')}>{title}</CardTitle>
          {description && (
            <CardDescription className="text-white/80 text-md md:text-lg">
              {description}
            </CardDescription>
          )}
        </CardHeader>

        <div className="flex flex-col-reverse md:flex-row gap-6">
          <div className="md:w-1/3 flex flex-col h-full space-y-4">
            <div className="h-1/2 bg-amber-950/30 rounded-2xl p-2 md:p-4 shadow-md">
              <LiveScore className="flex flex-col gap-4">
                <>
                  {Array.from({ length: gridSize }, (_, index) => (
                    <motion.div
                      key={`col-${index}`}
                      className="text-center font-semibold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <p className="flex justify-between text-sm">
                        <span>Column {index + 1}: </span>
                        <span>Available - {calculateAvailableSpaces(grid, index, false)}</span>
                      </p>
                    </motion.div>
                  ))}
                </>

                <Separator />

                <>
                  {grid.map((_, index) => (
                    <motion.div
                      key={`row-${index}`}
                      className="text-center font-semibold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <p className="flex justify-between text-sm">
                        <span>Row {index + 1}: </span>
                        <span>Available - {calculateAvailableSpaces(grid, index, true)}</span>
                      </p>
                    </motion.div>
                  ))}
                </>
              </LiveScore>{' '}
            </div>

            <div
              className={cn(
                'h-1/2 bg-amber-950/30 rounded-2xl p-2 md:p-4 shadow-md mb-4',
                'overflow-y-auto'
              )}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <h1 className="text-lg text-center font-bold">How to Play</h1>
              </div>
              <div className="space-y-4">{howToPlayText()}</div>
            </div>
          </div>

          <div className={cn('md:w-2/4 lg:w-1/2 space-y-5')}>
            <div className={cn(gridClass)}>
              {grid.map((row, index) => (
                <Fragment key={`main-${index}`}>
                  {row.map((cell) => (
                    <GridCell key={cell.id} cell={cell} modeType={type} gridSize={gridSize} />
                  ))}
                </Fragment>
              ))}
            </div>

            <Separator />

            <div className="bg-amber-950/30 rounded-2xl p-2 md:p-4 shadow-md">
              <DiscardPile cards={discardPile} modeType={type} />
            </div>
          </div>

          <div className="md:w-1/8 flex flex-col h-full space-y-4">
            <div className="h-1/2 border border-4 border-dashed rounded-2xl p-4">
              <div className={playerHandClass}>
                <SortableContext
                  items={playerHand.map((item) => item.id)}
                  strategy={horizontalListSortingStrategy}
                >
                  {playerHand.map((item) => (
                    <SortableItem key={item.id} id={item.id ?? 0}>
                      <ABCardComp
                        key={`card-${item.id}`}
                        card={item}
                        valueNotLabel={!labelNotValue}
                        modeType={type}
                        hover={true}
                        isDragging
                        inGrid={false}
                      />
                    </SortableItem>
                  ))}
                </SortableContext>
              </div>

              <Separator className="my-4" />

              <div className="flex items-center justify-center">
                <Button onClick={handleDiscard} disabled={playerHand.length !== 1}>
                  Next Round
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeDrag ? (
          <ABCardComp card={activeDrag} valueNotLabel={!labelNotValue} modeType={type} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
