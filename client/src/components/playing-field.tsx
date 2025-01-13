'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { emptyHand } from '@annabelle/shared/constants/empty-hand';
import { ABCard, ABCards } from '@annabelle/shared/core/card';
import { IGridCell } from '@annabelle/shared/core/grid-cell';
import { ABMode } from '@annabelle/shared/core/mode';
import {
  evaluateColumnHand,
  evaluateRowHand,
  evaluateTotalPokerScore,
} from '@annabelle/shared/functions/checkers';
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
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import ABCardComp from '@/components/ab-card';
import DiscardPile from '@/components/discard-pile';
import { GridCell } from '@/components/grid-cell';
import Placeholder from '@/components/placeholder';
import SortableItem from '@/components/sortable-item';
import { Button } from '@/components/ui/button';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import settingsStore from '@/stores/settings';
import { GameState } from '@/types/game-state';
import { canMoveCard, getGameState } from '@/utils/game-state';

type Props = {
  modeSlug: string;
  abCards: ABCards;
  gridClass: string;
  playerHandClass: string;
  gameOver?: boolean;
  abResult: {
    [key: string]: {
      word: string;
      match: string;
      points_final: number;
    };
  } | null;
  handleNextRound: (arg0: { [key: string]: unknown }) => void;
  initGame: (arg0: string) => void;
  setABGameOver: (arg0: boolean) => void;
};

const labelClass = cn(
  'hidden sm:flex',
  'items-center justify-center',
  'text-white/70 text-sm md:text-base',
  'font-medium',
  '[&]:!w-auto [&]:!h-auto [&]:!aspect-none'
);
const cornerCellClass = cn('aspect-none', 'w-auto h-auto', 'hidden sm:flex');

export default function PlayingField(props: Props) {
  const {
    modeSlug,
    abCards,
    gridClass,
    playerHandClass,
    gameOver = false,
    handleNextRound,
    initGame,
    setABGameOver,
  } = props;

  const defaultGameState = {
    gameOver: false,
    totalCards: abCards.length,
    playedCards: 0,
    score: 0,
    discardBonus: emptyHand,
    specialBonus: emptyHand,
  };
  const [playerHand, setPlayerHand] = useState<ABCards>([]);
  const mode = ABMode.getMode(modeSlug)!;
  const { title, description, gridSize, type } = mode;
  const { labelNotValue } = settingsStore();
  const [grid, setGrid] = useState<IGridCell[][]>([]);
  const [activeDrag, setActiveDrag] = useState<ABCard | null>(null);
  const [discardPile, setDiscardPile] = useState<ABCards>([]);
  const [gameState, setGameState] = useState<GameState>(defaultGameState);
  const [lockedCells, setLockedCells] = useState<Set<string>>(new Set());
  const [isDealing, setIsDealing] = useState(false);
  const [progress, setProgress] = useState(0);
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('grid');

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
    setGameState(defaultGameState);
  };

  const animateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);

          return 100;
        }

        return prev + 2;
      });
    }, 20);
  };

  const switchToScoreTab = () => {
    setActiveTab('score');
    tabsRef.current?.setAttribute('data-state', 'score');
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

  const playAgain = async () => {
    // setGrid([]);
    setActiveDrag(null);
    // setGameState(defaultGameState);
    setLockedCells(new Set());
    setIsDealing(true);
    await initGame(modeSlug);
    setABGameOver(false);
    initializeGame();
    setDiscardPile([]);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    setGameState(getGameState(grid));
  }, [grid]);

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
        }, 200);
      });
    }
  }, [abCards]);

  useEffect(() => {
    if (gameOver) {
      const scores = evaluateTotalPokerScore(grid, mode, discardPile);
      setGameState((prev) => ({
        ...prev,
        score: scores.score,
        discardBonus: scores.discardBonus,
        specialBonus: scores.specialBonus,
      }));
      switchToScoreTab();
      animateProgress();
      console.log(scores);
    }
  }, [gameOver]);

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

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
          <div className="sm:col-span-2">
            <div className="h-auto bg-amber-950/30 rounded-2xl p-2 md:p-4 shadow-md">
              <DiscardPile cards={discardPile} modeType={type} valueNotLabel={!labelNotValue} />
            </div>
          </div>

          <div className="sm:col-span-8">
            <Tabs
              defaultValue="grid"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
              ref={tabsRef}
            >
              <TabsList className="grid w-full grid-cols-2 bg-transparent backdrop-blur-sm border-white/20 p-1 rounded-lg">
                <TabsTrigger
                  value="grid"
                  className="data-[state=active]:bg-rose-700 data-[state=active]:text-white data-[state=inactive]:text-white rounded-md transition-colors"
                >
                  Grid
                </TabsTrigger>
                <TabsTrigger
                  value="score"
                  className="data-[state=active]:bg-rose-700 data-[state=active]:text-white data-[state=inactive]:text-white rounded-md transition-colors"
                  disabled={!gameOver}
                >
                  Score
                </TabsTrigger>
              </TabsList>
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
              <TabsContent value="grid">
                {!abCards || abCards.length === 0 ? (
                  <Placeholder />
                ) : (
                  <>
                    <div className={gridClass}>
                      <div className={cornerCellClass} />

                      {Array.from({ length: gridSize }, (_, colIndex) => (
                        <div key={`col-${colIndex}`} className={labelClass}>
                          <motion.div>
                            <span className="text-clip">
                              {evaluateColumnHand(grid, colIndex).name}:
                            </span>
                            <br />
                            <span className="text-clip">
                              ${evaluateColumnHand(grid, colIndex).points}
                            </span>
                          </motion.div>
                        </div>
                      ))}

                      {grid.map((row, rowIndex) => (
                        <Fragment key={`row-${rowIndex}`}>
                          <div className={labelClass}>
                            <motion.div className="mr-4">
                              <span className="text-clip">
                                {evaluateRowHand(grid, rowIndex).name}:
                              </span>
                              <br />
                              <span className="text-clip">
                                ${evaluateRowHand(grid, rowIndex).points}
                              </span>
                            </motion.div>
                          </div>

                          {row.map((cell, colIndex) => (
                            <GridCell
                              key={cell.id}
                              cell={cell}
                              modeType={type}
                              gridSize={gridSize}
                              lockedCells={lockedCells}
                              rowIndex={rowIndex}
                              columnIndex={colIndex}
                              valueNotLabel={!labelNotValue}
                            />
                          ))}
                        </Fragment>
                      ))}
                    </div>
                  </>
                )}
              </TabsContent>
              <TabsContent
                value="score"
                className={cn(
                  'mx-auto justify-center items-center',
                  'bg-amber-950/30 rounded-xl p-6 md:p-10'
                )}
              >
                {!gameOver ? (
                  <></>
                ) : (
                  <>
                    <h1 className="text-center text-xl">
                      {progress === 100 && <>Your Score 🤩</>}
                    </h1>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 py-4"
                    >
                      <div className="space-y-2">
                        {progress !== 100 ? (
                          <>
                            <p className="text-sm text-white text-center">
                              Evaluating your performance...
                            </p>
                            <Progress value={progress} className="h-2" />
                          </>
                        ) : (
                          <Separator />
                        )}
                      </div>

                      <AnimatePresence>
                        {progress === 100 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-4"
                          >
                            <div className="flex flex-col gap-4">
                              <AnimatePresence>
                                {Array.from({ length: gridSize }, (_, index) => (
                                  <motion.div
                                    key={`col-${index}`}
                                    className="text-center font-semibold"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                  >
                                    <p className="flex items-center justify-between gap-2 text-sm">
                                      <span>Column {index + 1}: </span>
                                      <span>{evaluateColumnHand(grid, index).name}</span>
                                      <span>${evaluateColumnHand(grid, index).points}</span>
                                    </p>
                                  </motion.div>
                                ))}
                              </AnimatePresence>

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
                                      <span>{evaluateRowHand(grid, index).name}</span>
                                      <span>${evaluateRowHand(grid, index).points}</span>
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
                                    <span>Score</span>
                                    <span>${gameState.score}</span>
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
                                    <span>Discard Bonus</span>
                                    <span>{gameState.discardBonus?.name}</span>
                                    <span>${gameState.discardBonus?.points ?? 0}</span>
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
                                    <span>Special Bonus</span>
                                    <span>{gameState.specialBonus?.name}</span>
                                    <span>${gameState.specialBonus?.points}</span>
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
                                    <span>Final Score</span>
                                    <span>
                                      $
                                      {(gameState.score as number) +
                                        (gameState.specialBonus?.points as number) +
                                        (gameState.discardBonus?.points as number)}
                                    </span>
                                  </p>
                                </motion.div>
                              </>
                            </div>

                            {gameOver && process.env.NODE_ENV === 'development' && (
                              <div className="flex items-center justify-center mt-8">
                                <Button
                                  variant="secondary"
                                  size="lg"
                                  onClick={() => {
                                    animateProgress();
                                  }}
                                  className="animate-fade-in"
                                >
                                  Reload animation
                                </Button>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div className="sm:col-span-2">
            <div className="h-auto border border-4 border-dashed rounded-2xl p-4">
              <div className={playerHandClass}>
                {isDealing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
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
                  </>
                )}
              </div>

              <div className="flex items-center justify-center">
                {gameOver ? (
                  <Button onClick={playAgain} disabled>
                    Play Again
                  </Button>
                ) : (
                  <div className="flex flex-col w-full">
                    <Separator className="my-4" />
                    <Button onClick={handleDiscard} disabled={playerHand.length !== 1 || isDealing}>
                      Discard
                    </Button>
                  </div>
                )}
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
