'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { arrayMove } from '@dnd-kit/sortable';
import {
  ABCard,
  ABCards,
  ABMode,
  calculateScore,
  emptyHand,
  IABGridCell,
  SlugId,
} from '@untitled-card-game/shared';
import { BsEraserFill } from 'react-icons/bs';

import ABCardComp from '@/components/ab-card';
import ActionButton from '@/components/action-button';
import DiscardPile from '@/components/discard-pile';
import GameGrid from '@/components/game-grid';
import HighScoreDisplay from '@/components/high-score-display';
import Placeholder from '@/components/placeholder';
import PlayerHand from '@/components/player-hand';
import ScoreDisplay from '@/components/score-display';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { useUcgStore } from '@/stores/ucg-store';
import { GameState } from '@/types/game-state';
import { confettiFireworks } from '@/utils/confetti';
import { canMoveCard, getGameState, isGridFull } from '@/utils/game-state';
import { applyJokerValuesToGrid, evaluateAllJokersInGrid } from '@/utils/joker-evaluation';

export default function PlayingField({
  modeSlug,
  abCards,
  gridClass,
  playerHandClass,
  gameOver = false,
  handleNextRound,
  initGame,
  setABGameOver,
  showSimulateButton = false,
}: {
  modeSlug: SlugId;
  abCards: ABCards;
  gridClass: string;
  playerHandClass: string;
  gameOver?: boolean;
  handleNextRound: (arg0: { [key: string]: unknown }) => void;
  initGame: (arg0: string) => void;
  setABGameOver: (arg0: boolean) => void;
  showSimulateButton?: boolean;
}) {
  const playerHandText = 'Player Hand';

  // Stores
  const {
    rankLabel,
    setHighScore,
    getHighScore,
    resetHighScore,
    setJokerValue,
    clearAllJokerValues,
  } = useUcgStore();

  // State
  const defaultGameState = useMemo<GameState>(
    () => ({
      gameOver: false,
      totalCards: abCards.length,
      playedCards: 0,
      score: 0,
      discardBonus: emptyHand,
      specialBonus: emptyHand,
    }),
    [abCards]
  );
  const [playerHand, setPlayerHand] = useState<ABCards>([]);
  const [grid, setGrid] = useState<IABGridCell[][]>([]);
  const [activeDrag, setActiveDrag] = useState<ABCard | null>(null);
  const [discardPile, setDiscardPile] = useState<ABCards>([]);
  const [gameState, setGameState] = useState<GameState>(defaultGameState);
  const [lockedCells, setLockedCells] = useState<Set<string>>(new Set());
  const [isDealing, setIsDealing] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('grid');
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const isMobile = useIsMobile();

  // Refs
  const tabsRef = useRef<HTMLDivElement>(null);
  const coinInserted = useRef(false);
  const highScoreBeaten = useRef(false);
  const gameOverProcessed = useRef(false);

  // Mode information
  const mode = ABMode.getMode(modeSlug)!;
  const { title, gridSize, type } = mode;

  // DnD setup
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  // Animation and UI functions
  const animateProgress = (): Promise<void> => {
    return new Promise<void>((resolve) => {
      let progress = 0;

      const animate = () => {
        progress += 1;
        setProgress(progress);

        if (progress < 100) {
          requestAnimationFrame(animate);
        } else {
          resolve();
        }
      };

      requestAnimationFrame(animate);
    });
  };

  const switchToScoreTab = () => {
    setActiveTab('score');
    tabsRef.current?.setAttribute('data-state', 'score');
  };

  const switchToGridTab = () => {
    setActiveTab('grid');
    tabsRef.current?.setAttribute('data-state', 'grid');
  };

  // Game logic
  const insertCoin = useCallback(() => {
    setTimeout(() => {
      abCards.forEach((_, index) => {
        setTimeout(() => {
          setPlayerHand((prev) => {
            const card = abCards[index];
            card.faceUp = true;
            return [...prev.slice(0, index), card, ...prev.slice(index + 1)];
          });
        }, index * 200);
      });
    }, 500);
    setPlayerHand(abCards);

    const newGrid: IABGridCell[][] = Array(gridSize)
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
  }, [abCards, defaultGameState, discardPile, gridSize]);

  const evaluateAndApplyJokers = useMemo(
    () => (gridToEvaluate: IABGridCell[][]) => {
      // Evaluate all jokers in the grid
      const jokerEvaluations = evaluateAllJokersInGrid(gridToEvaluate);

      // Store joker values in zustand
      jokerEvaluations.forEach((evaluation) => {
        setJokerValue(evaluation.cardId, evaluation.rank, evaluation.suit);
      });

      // Apply joker values to the grid
      return applyJokerValuesToGrid(gridToEvaluate, jokerEvaluations);
    },
    [setJokerValue]
  );

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
        if (playerHand.length === 1) {
          const targetCard = newGrid[rowIndex][columnIndex].card;

          if (!targetCard || targetCard.played) {
            setActiveDrag(null);
            return;
          }

          sourceCard.faceUp = true;
          targetCard.faceUp = true;
          newGrid[rowIndex][columnIndex].card = sourceCard;
          setPlayerHand([targetCard]);
        } else {
          if (newGrid[rowIndex][columnIndex].card) {
            const targetCard = newGrid[rowIndex][columnIndex].card! as ABCard;

            if (!targetCard.played) {
              sourceCard.faceUp = true;
              targetCard.faceUp = true;
              newGrid[rowIndex][columnIndex].card = sourceCard;
              setPlayerHand((prev) => {
                const updatedHand = prev.filter((c) => c.id !== sourceCard.id);
                return [...updatedHand, targetCard];
              });
            }
          } else {
            sourceCard.faceUp = true;
            newGrid[rowIndex][columnIndex].card = sourceCard;
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

      // Evaluate and apply joker values after placing a card
      const gridWithJokers = evaluateAndApplyJokers(newGrid);
      setGrid(gridWithJokers);
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

  const handleDiscard = useMemo(
    () => async () => {
      if (!playerHand || playerHand.length !== 1) {
        return;
      }

      const abDiscard = playerHand[0];

      if (!abDiscard) {
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

      // Final joker evaluation before locking the round
      const finalGrid = evaluateAndApplyJokers(grid);

      // Mark all cards in the grid as played
      finalGrid.forEach((row) => {
        row.forEach((cell) => {
          if (cell.card) {
            cell.card.setPlayed(true);
          }
        });
      });

      setGrid(finalGrid);
      abDiscard.faceUp = true;
      setDiscardPile((prev) => [...prev, abDiscard] as ABCards);
      await handleNextRound({ abDiscard, newGrid: finalGrid });
      setPlayerHand([]);

      if (isGridFull(finalGrid)) {
        setGameState((prev) => ({ ...prev, gameOver: true }));
        return;
      }
    },
    [evaluateAndApplyJokers, grid, handleNextRound, playerHand]
  );

  const hasMovableCardsOnGrid = useMemo(
    () => () => {
      return grid.some((row) => row.some((cell) => cell.card && !cell.card.played));
    },
    [grid]
  );

  const handleReturnCards = useMemo(
    () => () => {
      // Find all movable (non-played) cards on the grid
      const cardsToReturn: ABCard[] = [];
      const newGrid = grid.map((row) =>
        row.map((cell) => {
          if (cell.card && !cell.card.played) {
            cardsToReturn.push(cell.card);
            return { ...cell, card: null };
          }
          return cell;
        })
      );

      if (cardsToReturn.length > 0) {
        setIsReturning(true);

        // Clear grid first
        setGrid(newGrid);

        // Small delay to allow grid to clear visually
        setTimeout(() => {
          // Get current hand length to know where to start adding returned cards
          const currentHandLength = playerHand.length;

          // Set all cards to face down
          cardsToReturn.forEach((card) => {
            card.faceUp = false;
          });

          // Add cards to hand
          setPlayerHand((prev) => [...prev, ...cardsToReturn]);

          // Animate cards flipping face-up one by one
          const promises = cardsToReturn.map((card, index) => {
            return new Promise<void>((resolve) => {
              setTimeout(() => {
                card.faceUp = true;
                setPlayerHand((prev) => {
                  const cardIndex = currentHandLength + index;
                  if (cardIndex < prev.length) {
                    return [
                      ...prev.slice(0, cardIndex),
                      prev[cardIndex],
                      ...prev.slice(cardIndex + 1),
                    ];
                  }
                  return prev;
                });
                resolve();
              }, index * 150);
            });
          });

          Promise.all(promises).then(() => {
            setTimeout(() => {
              setIsReturning(false);
            }, 200);
          });
        }, 100);
      }
    },
    [grid, playerHand]
  );

  const playAgain = useMemo(
    () => async () => {
      setABGameOver(false);
      switchToGridTab();
      setGrid([]);
      setActiveDrag(null);
      setGameState(defaultGameState);
      setLockedCells(new Set());
      setIsDealing(true);
      clearAllJokerValues();
      gameOverProcessed.current = false;
      await initGame(modeSlug);
      insertCoin();
      setDiscardPile([]);
    },
    [clearAllJokerValues, defaultGameState, initGame, insertCoin, modeSlug, setABGameOver]
  );

  const handleHighScore = useCallback(async () => {
    animateProgress().then(() => {
      if (getHighScore(modeSlug).value < gameState.score) {
        setHighScore(modeSlug, {
          value: gameState.score + gameState.specialBonus?.points + gameState.discardBonus?.points,
          date: new Date(),
          gameState: grid,
        });
        highScoreBeaten.current = true;
        confettiFireworks();
      }
    });
  }, [
    gameState.discardBonus?.points,
    gameState.score,
    gameState.specialBonus?.points,
    getHighScore,
    grid,
    modeSlug,
    setHighScore,
  ]);

  useEffect(() => {
    if (!coinInserted.current) {
      insertCoin();
      coinInserted.current = true;
      highScoreBeaten.current = false;
    }
  }, [insertCoin]);

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
            setPlayerHand((prev) => {
              const card = prev[index];
              card.faceUp = true;
              return [...prev.slice(0, index), card, ...prev.slice(index + 1)];
            });
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

  // Action buttons component to avoid duplication
  const actionButtons = useMemo(
    () => (
      <div className="flex items-center justify-center gap-2 md:flex-col md:gap-4">
        <ActionButton
          gameOver={gameOver}
          isGridFull={isGridFull(grid)}
          playerHand={playerHand}
          isDealing={isDealing || isReturning}
          handleDiscard={handleDiscard}
          playAgain={playAgain}
          progress={progress}
        />
        {!gameOver && (
          <Button
            onClick={handleReturnCards}
            disabled={!hasMovableCardsOnGrid() || isDealing || isReturning}
            variant="secondary"
            className="w-1/4 md:w-1/2 cursor-pointer p-4.5"
            size="sm"
          >
            <BsEraserFill />
            <span className="sr-only">Return cards</span>
          </Button>
        )}
      </div>
    ),
    [
      gameOver,
      grid,
      playerHand,
      isDealing,
      isReturning,
      handleDiscard,
      playAgain,
      progress,
      hasMovableCardsOnGrid,
      handleReturnCards,
    ]
  );

  useEffect(() => {
    if (gameOver && !gameOverProcessed.current) {
      gameOverProcessed.current = true;
      const scores = calculateScore(grid, mode, discardPile);
      setGameState((prev) => ({
        ...prev,
        score: scores.score,
        discardBonus: scores.discardBonus,
        specialBonus: scores.specialBonus,
      }));
      switchToScoreTab();
      handleHighScore();
      coinInserted.current = false;
    }
  }, [discardPile, gameOver, grid, handleHighScore, mode]);

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
      <div className="bg-black/80 rounded-2xl p-4 md:p-8 w-full">
        <div className="flex flex-col gap-6 h-full">
          {/* Single Player Hand - shown at top on mobile only */}
          {activeTab === 'grid' && isMobile && (
            <div>
              <div className="bg-emerald-600/30 rounded-2xl shadow-md p-4 flex flex-col gap-4">
                <div className="flex items-center justify-center">
                  <h2 className="text-sm text-center font-bold text-white">{playerHandText}</h2>
                </div>
                <PlayerHand
                  playerHand={playerHand}
                  isDealing={isDealing}
                  rankLabel={rankLabel}
                  modeType={type}
                  playerHandClass={playerHandClass}
                  playerHandText={playerHandText}
                />
                <Separator />
                {actionButtons}
              </div>
            </div>
          )}

          {/* Main grid layout for md and above */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Single Player Hand - shown on left side on desktop only */}
            {!isMobile && (
              <div className="md:col-span-2">
                {activeTab === 'grid' && (
                  <div className="md:sticky md:top-0 h-auto bg-emerald-600/30 rounded-2xl shadow-md flex flex-col gap-4">
                    <PlayerHand
                      playerHand={playerHand}
                      isDealing={isDealing}
                      rankLabel={rankLabel}
                      modeType={type}
                      playerHandClass={playerHandClass}
                      playerHandText={playerHandText}
                    />

                    <div className="flex items-center justify-center mt-1">
                      <div className="flex flex-col w-full p-2 -mt-8">
                        <div className="px-4">
                          <Separator className="mt-6 mb-4" />
                        </div>

                        <div className="flex flex-col items-center justify-center mb-2">
                          {actionButtons}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="md:col-span-8 flex flex-col">
              <Tabs
                defaultValue="grid"
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full flex-1 flex flex-col"
                ref={tabsRef}
              >
                <TabsList className="grid w-full grid-cols-2 bg-transparent  border-white/20 p-1">
                  <TabsTrigger
                    value="grid"
                    className="data-[state=active]:bg-rose-700 data-[state=active]:text-white data-[state=inactive]:bg-slate-200 data-[state=inactive]:text-black transition-colors rounded-none rounded-l-md"
                  >
                    {title}
                  </TabsTrigger>
                  <TabsTrigger
                    value="score"
                    className="data-[state=active]:bg-rose-700 data-[state=active]:text-white data-[state=inactive]:bg-slate-200 data-[state=inactive]:text-black transition-colors rounded-none rounded-r-md"
                    disabled={!gameOver}
                  >
                    Score
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="grid" className="flex-1 min-h-[600px]">
                  {!abCards || abCards.length === 0 ? (
                    <>
                      <Placeholder />
                      <span className="flex items-center justify-center text-white mt-4">
                        Stuck? Try refreshing the page 😅
                      </span>
                    </>
                  ) : (
                    <>
                      <GameGrid
                        grid={grid}
                        lockedCells={lockedCells}
                        gridClass={gridClass}
                        gridSize={gridSize}
                        type={type}
                        rankLabel={rankLabel}
                      />

                      {getHighScore(modeSlug).value !== 0 && activeTab === 'grid' && (
                        <div className="hidden md:block mt-4">
                          <HighScoreDisplay modeSlug={modeSlug} />
                        </div>
                      )}
                    </>
                  )}
                </TabsContent>
                <TabsContent
                  value="score"
                  className={cn(
                    'flex-1 min-h-[600px]',
                    'flex justify-center items-start',
                    'bg-sky-700/50 rounded-xl p-6 md:p-10'
                  )}
                >
                  <ScoreDisplay
                    gameState={gameState}
                    grid={grid}
                    gridSize={gridSize}
                    progress={progress}
                    gameOver={gameOver}
                    playAgain={playAgain}
                    modeSlug={modeSlug}
                    mode={mode}
                    coinInserted={coinInserted}
                    resetHighScore={resetHighScore}
                    confirmModalOpen={confirmModalOpen}
                    setConfirmModalOpen={setConfirmModalOpen}
                    animateProgress={animateProgress}
                  />
                </TabsContent>
              </Tabs>
            </div>

            {activeTab === 'grid' && (
              <div className="hidden md:block md:col-span-2">
                <DiscardPile
                  cards={discardPile}
                  modeType={type}
                  rankLabel={!rankLabel}
                  gameOver={gameOver}
                  showSimulateButton={showSimulateButton}
                  setABGameOver={setABGameOver}
                  gridSize={gridSize}
                />
              </div>
            )}
          </div>

          {/* Discard Pile - Below grid on md and below */}
          {activeTab === 'grid' && (
            <div className="md:hidden">
              <DiscardPile
                cards={discardPile}
                modeType={type}
                rankLabel={!rankLabel}
                gameOver={gameOver}
                showSimulateButton={showSimulateButton}
                setABGameOver={setABGameOver}
                gridSize={gridSize}
              />
            </div>
          )}

          {/* High Score Display on mobile */}
          {getHighScore(modeSlug).value > 0 && activeTab === 'grid' && (
            <div className="block md:hidden">
              <HighScoreDisplay modeSlug={modeSlug} />
            </div>
          )}
        </div>
      </div>

      <DragOverlay>
        {activeDrag ? (
          <ABCardComp card={activeDrag} rankLabel={!rankLabel} modeType={type} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
