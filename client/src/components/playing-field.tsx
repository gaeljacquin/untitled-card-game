'use client';

import { Fragment, ReactNode, useEffect, useState } from 'react';
import { ABCard, ABCards } from '@annabelle/shared/core/card';
import { IGridCell } from '@annabelle/shared/core/grid-cell';
import { ABMode } from '@annabelle/shared/core/mode';
import { evaluateTotalPokerScore } from '@annabelle/shared/functions/checkers';
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
import { Loader2 } from 'lucide-react';
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
import { canMoveCard, getGameState } from '@/utils/game-state';

type Props = {
  modeSlug: string;
  abCards: ABCards;
  gridClass: string;
  playerHandClass: string;
  howToPlayText: () => ReactNode;
  handleNextRound: (arg0: { [key: string]: unknown }) => void;
  evaluateColumn: (arg0: IGridCell[][], arg1: number) => { name: string; points: number };
  evaluateRow: (arg0: IGridCell[][], arg1: number) => { name: string; points: number };
  evaluateSpecial: (arg0: IGridCell[][]) => { name: string; points: number };
  gameOver?: boolean;
  abResult: {
    [key: string]: {
      word: string;
      match: string;
      points_final: number;
    };
  } | null;
};

export default function PlayingField(props: Props) {
  const {
    modeSlug,
    abCards,
    howToPlayText,
    gridClass,
    playerHandClass,
    handleNextRound,
    evaluateColumn,
    evaluateRow,
    evaluateSpecial,
    gameOver = false,
    abResult,
  } = props; // (1)
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
    totalScore: 0,
    bonusPoints: 0,
  });
  const [lockedCells, setLockedCells] = useState<Set<string>>(new Set());
  const [isDealing, setIsDealing] = useState(false);
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
    setGameState({
      gameOver: false,
      totalCards: gridSize * gridSize,
      playedCards: 0,
      totalScore: 0,
      bonusPoints: 0,
    });
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const card =
      playerHand.find((c) => c.id === active.id) ||
      grid.flat().find((cell) => cell.card?.id === active.id)?.card;

    if (card && canMoveCard(card)) {
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

      const cellId = `cell-${rowIndex}-${columnIndex}`;
      if (lockedCells.has(cellId)) {
        setActiveDrag(null);
        return;
      }

      const newGrid = [...grid];

      if (playerHand.includes(sourceCard)) {
        // Handle last card in hand - only allow swapping with unplayed cards
        if (playerHand.length === 1) {
          const targetCard = newGrid[rowIndex][columnIndex].card;

          // If target cell is empty or card is played, return card to hand
          if (!targetCard || targetCard.played) {
            setActiveDrag(null);
            return;
          }

          // Swap the cards
          newGrid[rowIndex][columnIndex].card = { ...sourceCard, faceUp: true } as ABCard;
          setPlayerHand([{ ...targetCard, faceUp: true } as ABCard]);
        } else {
          // Handle normal card placement
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
    if (!playerHand || playerHand.length !== 1) {
      return;
    }

    const cardToDiscard = playerHand[0];
    if (!cardToDiscard) {
      return;
    }

    const newLockedCells = new Set<string>();
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell.card) {
          newLockedCells.add(`cell-${rowIndex}-${colIndex}`);
        }
      });
    });
    setLockedCells(newLockedCells);

    const newGrid = grid.map((row) =>
      row.map((cell) => ({
        ...cell,
        card: cell.card ? { ...cell.card, played: true } : null,
      }))
    ) as IGridCell[][];

    setGrid(newGrid);
    setDiscardPile((prev) => [...prev, { ...cardToDiscard, faceUp: true }] as ABCards);

    await handleNextRound({ discardedABCard: cardToDiscard, newGrid });

    setPlayerHand([]);

    const isGridFull = newGrid.every((row) => row.every((cell) => cell.card !== null));
    if (isGridFull) {
      setGameState((prev) => ({ ...prev, gameOver: true }));
      return;
    }
  };

  useEffect(() => {
    if (abCards && abCards.length > 0) {
      setIsDealing(true);
      setPlayerHand(abCards);

      const promises = abCards.map((_, index) => {
        return new Promise<void>((resolve) => {
          setTimeout(() => {
            setPlayerHand((prev) => [
              ...prev.slice(0, index),
              { ...prev[index], faceUp: true } as ABCard,
              ...prev.slice(index + 1),
            ]);
            resolve();
          }, index * 200);
        });
      });

      Promise.all(promises).then(() => {
        setTimeout(() => {
          setIsDealing(false);
        }, 200); // (1)
      });
    }
  }, [abCards]);

  useEffect(() => {
    if (gameOver && abResult) {
      const totalScore =
        type === 'abword'
          ? Object.values(abResult).reduce((sum, item) => sum + item.points_final, 0)
          : evaluateTotalPokerScore(grid);
      const bonusPoints =
        type === 'abword'
          ? evaluateTotalPokerScore(grid)
          : Object.values(abResult).reduce((sum, item) => sum + item.points_final, 0);
      setGameState((prev) => ({
        ...prev,
        totalScore: totalScore + bonusPoints,
        bonusPoints: bonusPoints,
      }));
    }
  }, [gameOver]);

  useEffect(() => {
    if (type === 'abpoker') {
      const totalScore = evaluateTotalPokerScore(grid);
      setGameState((prev) => ({
        ...prev,
        totalScore,
      }));
    }
  }, [grid]);

  if (!abCards || abCards.length === 0) {
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
          <CardDescription className="text-md bg-white/70 text-rose-800 p-2">
            The game is currently in beta. Please reload the page if you get stuck or the game
            crashes.
          </CardDescription>
        </CardHeader>

        <div className="flex flex-col-reverse md:flex-row gap-6">
          <div className="md:w-1/3 flex flex-col h-full space-y-4">
            <div
              className={cn(
                'h-1/2 bg-amber-950/30 rounded-2xl p-2 md:p-4 shadow-md',
                gameOver && 'shadow-animate rounded-2xl'
              )}
            >
              <LiveScore
                className="flex flex-col gap-4"
                title={gameOver ? 'Final Score' : 'Live Score'}
              >
                {gameOver && abResult && type === 'abword' ? (
                  <>
                    <>
                      {Array.from({ length: gridSize }, (_, index) => (
                        <motion.div
                          key={`col-${index}`}
                          className="text-center font-semibold"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <p className="flex items-center justify-between gap-2 text-sm">
                            <span>Column {index + 1}: </span>
                            <span>
                              {abResult[`col-${index + 1}`].word} &rarr;{' '}
                              {abResult[`col-${index + 1}`].match !== ''
                                ? abResult[`col-${index + 1}`].match
                                : '_'}
                            </span>
                            <span>${abResult[`col-${index + 1}`].points_final}</span>
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
                          <p className="flex items-center justify-between gap-2 text-sm">
                            <span>Row {index + 1} </span>
                            <span>
                              {abResult[`row-${index + 1}`].word} &rarr;{' '}
                              {abResult[`row-${index + 1}`].match !== ''
                                ? abResult[`row-${index + 1}`].match
                                : '_'}
                            </span>
                            <span>${abResult[`row-${index + 1}`].points_final}</span>
                          </p>
                        </motion.div>
                      ))}
                    </>
                    <Separator />
                    <>
                      <motion.div
                        className="text-center font-semibold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <p className="flex items-center justify-between gap-2 text-sm">
                          <span>Bonus Points</span>
                          <span>${gameState.bonusPoints}</span>
                        </p>
                      </motion.div>
                    </>
                    <Separator />
                    <>
                      <motion.div
                        className="text-center font-semibold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <p className="flex items-center justify-between gap-2 text-sm">
                          <span>Special</span>
                          <span>
                            {' '}
                            {abResult['special'].word} &rarr;{' '}
                            {abResult['special'].match !== '' ? abResult['special'].match : '_'}
                          </span>
                          <span>
                            $
                            {gameOver
                              ? abResult['special'].points_final
                              : evaluateSpecial(grid).points}
                          </span>
                        </p>
                      </motion.div>
                    </>
                    <Separator />
                    <>
                      <motion.div
                        className="text-center font-semibold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <p className="flex items-center justify-between gap-2 text-sm">
                          <span>Total Score</span>
                          <span>${gameState.totalScore}</span>
                        </p>
                      </motion.div>
                    </>
                  </>
                ) : (
                  <>
                    <>
                      {Array.from({ length: gridSize }, (_, index) => (
                        <motion.div
                          key={`col-${index}`}
                          className="text-center font-semibold"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <p className="flex items-center justify-between gap-2 text-sm">
                            <span>Column {index + 1}: </span>
                            <span>{evaluateColumn(grid, index).name}</span>
                            <span>${evaluateColumn(grid, index).points}</span>
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
                          <p className="flex items-center justify-between gap-2 text-sm">
                            <span>Row {index + 1} </span>
                            <span>{evaluateRow(grid, index).name}</span>
                            <span>${evaluateRow(grid, index).points}</span>
                          </p>
                        </motion.div>
                      ))}
                    </>
                    <Separator />
                    <>
                      <motion.div
                        className="text-center font-semibold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <p className="flex items-center justify-between gap-2 text-sm">
                          <span>Special</span>
                          <span>{evaluateSpecial(grid).name}</span>
                          <span>${evaluateSpecial(grid).points}</span>
                        </p>
                      </motion.div>
                    </>
                    {gameOver && (
                      <>
                        <Separator />
                        <>
                          <motion.div
                            className="text-center font-semibold"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                          >
                            <p className="flex items-center justify-between gap-2 text-sm">
                              <span>Bonus Points</span>
                              <span>${gameState.bonusPoints}</span>
                            </p>
                          </motion.div>
                        </>
                      </>
                    )}
                    {type === 'abpoker' ||
                      (type === 'abword' && gameOver && (
                        <>
                          <Separator />
                          <>
                            <motion.div
                              className="text-center font-semibold"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              <p className="flex items-center justify-between gap-2 text-sm">
                                <span>Total Score</span>
                                <span>${gameState.totalScore}</span>
                              </p>
                            </motion.div>
                          </>
                        </>
                      ))}
                  </>
                )}
              </LiveScore>
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
            {gameOver && (
              <div
                className={cn(
                  'flex items-center justify-center',
                  'text-md bg-white/70 text-rose-800 p-2'
                )}
              >
                Please reload the page to play a new round.
              </div>
            )}
            <div className={cn(gridClass)}>
              {grid.map((row, index) => (
                <Fragment key={`grid-${index}`}>
                  {row.map((cell, rowIndex) => (
                    <GridCell
                      key={cell.id}
                      cell={cell}
                      modeType={type}
                      gridSize={gridSize}
                      lockedCells={lockedCells}
                      rowIndex={rowIndex}
                      columnIndex={index}
                    />
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
                {isDealing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <SortableContext
                    items={playerHand.map((item) => item.id)}
                    strategy={horizontalListSortingStrategy}
                  >
                    {playerHand.map((item) => (
                      <SortableItem key={item.id} id={item.id}>
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
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex items-center justify-center">
                <Button onClick={handleDiscard} disabled={playerHand.length !== 1 || isDealing}>
                  Confirm
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

/* Notes
(1) Added a small buffer after dealing the last card; part of the race condition fix
*/
