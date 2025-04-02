'use client';

import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { emptyHand } from '@untitled-card-game/shared/constants/empty-hand';
import { ABCard, ABCards } from '@untitled-card-game/shared/core/card';
import { IABGridCell } from '@untitled-card-game/shared/core/grid-cell';
import { ABMode, SlugId } from '@untitled-card-game/shared/core/mode';
import {
  calculateScore,
  evaluateGridColumn,
  evaluateGridRow,
} from '@untitled-card-game/shared/functions/evaluate';
import ABCardComp from 'components/ab-card';
import DiscardPile from 'components/discard-pile';
import { GridCell } from 'components/grid-cell';
import Placeholder from 'components/placeholder';
import SortableItem from 'components/sortable-item';
import { Button } from 'components/ui/button';
import { CardDescription, CardHeader, CardTitle } from 'components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from 'components/ui/dialog';
import { Progress } from 'components/ui/progress';
import { Separator } from 'components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'components/ui/tabs';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from 'lib/utils';
import { Loader2 } from 'lucide-react';
import highScoreStore from 'stores/high-score';
import settingsStore from 'stores/settings';
import { GameState } from 'types/game-state';
import { confettiFireworks } from 'utils/confetti';
import { canMoveCard, getGameState, isGridFull } from 'utils/game-state';

type Props = {
  modeSlug: SlugId;
  abCards: ABCards;
  gridClass: string;
  playerHandClass: string;
  gameOver?: boolean;
  handleNextRound: (arg0: { [key: string]: unknown }) => void;
  initGame: (arg0: string) => void;
  setABGameOver: (arg0: boolean) => void;
};

type HighScoreDisplayProps = {
  modeSlug: SlugId;
};

type PlayerHandProps = {
  playerHand: ABCards;
  isDealing: boolean;
  rankLabel: boolean;
  modeType: 'abpoker';
  playerHandClass: string;
};

type ActionButtonProps = {
  gameOver: boolean;
  isGridFull: boolean;
  playerHand: ABCards;
  isDealing: boolean;
  handleDiscard: () => void;
  playAgain: () => void;
  progress: number;
};

type GameGridProps = {
  grid: IABGridCell[][];
  lockedCells: Set<string>;
  gridClass: string;
  gridSize: number;
  type: 'abpoker';
  rankLabel: boolean;
};

type ScoreDisplayProps = {
  gameState: GameState;
  grid: IABGridCell[][];
  gridSize: number;
  progress: number;
  gameOver: boolean;
  playAgain: () => void;
  modeSlug: SlugId;
  mode: ABMode;
  coinInserted: React.MutableRefObject<boolean>;
  resetHighScore: (slug: SlugId) => void;
  confirmModalOpen: boolean;
  setConfirmModalOpen: (open: boolean) => void;
  animateProgress: () => Promise<void>;
};

const labelClass = cn(
  'hidden sm:flex',
  'items-center justify-center',
  'text-white/70 text-sm md:text-base',
  'font-medium',
  '[&]:w-auto! [&]:h-auto! [&]:aspect-none!'
);
const cornerCellClass = cn('aspect-none', 'w-auto h-auto', 'hidden sm:flex');
const playerHandText = 'Player Hand';

const HighScoreDisplay = ({ modeSlug }: HighScoreDisplayProps) => {
  const { getHighScore } = highScoreStore();

  const highScoreDate = new Date(getHighScore(modeSlug).date);
  const formattedDate =
    highScoreDate.getMonth() +
    1 +
    '/' +
    highScoreDate.getDate() +
    '/' +
    highScoreDate.getFullYear();

  return (
    <div className="flex flex-col gap-2 my-4 p-4 bg-amber-950/60 rounded-xl">
      <p className="text-md">High Score</p>
      <p className="text-sm">${getHighScore(modeSlug).value}</p>
      <p className="text-sm">{formattedDate}</p>
    </div>
  );
};

const PlayerHand = ({
  playerHand,
  isDealing,
  rankLabel,
  modeType,
  playerHandClass,
}: PlayerHandProps) => {
  return (
    <div className={cn(playerHandClass)}>
      <div className="flex flex-wrap flex-row sm:flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center mt-5 hidden sm:block">
          <h2 className="text-sm text-center font-bold">{playerHandText}</h2>
        </div>
        {isDealing ? (
          <Loader2 className="size-4 animate-spin my-2" />
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
                  rankLabel={!rankLabel}
                  modeType={modeType}
                  hover={true}
                  isDragging
                  inGrid={false}
                />
              </SortableItem>
            ))}
          </SortableContext>
        )}
      </div>
    </div>
  );
};

const ActionButton = ({
  gameOver,
  isGridFull,
  playerHand,
  isDealing,
  handleDiscard,
  playAgain,
  progress,
}: ActionButtonProps) => {
  if (gameOver) {
    return (
      <Button
        onClick={playAgain}
        disabled={progress !== 100}
        className="text-wrap truncate w-full hover:cursor-pointer"
      >
        New Game
      </Button>
    );
  }

  return (
    <Button
      onClick={handleDiscard}
      disabled={playerHand.length !== 1 || isDealing}
      className="truncate p-4"
    >
      <span className="flex w-full items-center justify-center">
        {isGridFull ? 'Finish' : 'Next'}
      </span>
    </Button>
  );
};

const GameGrid = ({ grid, lockedCells, gridClass, gridSize, type, rankLabel }: GameGridProps) => {
  return (
    <div className={gridClass}>
      <div className={cornerCellClass} />

      {Array.from({ length: gridSize }, (_, colIndex) => (
        <div key={`col-${colIndex}`} className={cn(labelClass, '-mt-3')}>
          <motion.div>
            <span className="text-clip">{evaluateGridColumn(grid, colIndex).name}:</span>
            <br />
            <span className="text-clip">${evaluateGridColumn(grid, colIndex).points}</span>
          </motion.div>
        </div>
      ))}

      {grid.map((row, rowIndex) => (
        <Fragment key={`row-${rowIndex}`}>
          <div className={cn(labelClass, '-ml-2')}>
            <motion.div className="mr-4">
              <span className="text-clip">{evaluateGridRow(grid, rowIndex).name}:</span>
              <br />
              <span className="text-clip">${evaluateGridRow(grid, rowIndex).points}</span>
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
              rankLabel={!rankLabel}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
};

const ScoreDisplay = ({
  gameState,
  grid,
  gridSize,
  progress,
  gameOver,
  playAgain,
  modeSlug,
  mode,
  coinInserted,
  resetHighScore,
  confirmModalOpen,
  setConfirmModalOpen,
  animateProgress,
}: ScoreDisplayProps) => {
  const highScoreBeaten = useRef(false);
  const { getHighScore } = highScoreStore();

  return (
    <>
      {!gameOver ? (
        <></>
      ) : (
        <>
          {progress === 100 && (
            <div className="flex flex-col gap-2">
              <h1 className="text-center text-xl">Final Results</h1>
              {highScoreBeaten.current && (
                <p className="text-md">You just set a new high score! 🤩</p>
              )}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 py-4"
          >
            <div className="space-y-2">
              {progress !== 100 ? <Progress value={progress} className="h-2" /> : <Separator />}
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
                            <span>Column {index + 1} </span>
                            <span>{evaluateGridColumn(grid, index).name}</span>
                            <span>${evaluateGridColumn(grid, index).points}</span>
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
                            <span>{evaluateGridRow(grid, index).name}</span>
                            <span>${evaluateGridRow(grid, index).points}</span>
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
                          <span>Grid Total</span>
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
                          <span>
                            {gameState.discardBonus?.points > 0 && gameState.discardBonus?.name}
                          </span>
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
                          <span>
                            {gameState.specialBonus?.points > 0 && gameState.specialBonus?.name}
                          </span>
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
                          <span>Overall Score</span>
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

                  {gameOver && (
                    <div className="flex flex-col items-center justify-center mt-8 gap-8">
                      <Button
                        onClick={playAgain}
                        disabled={progress !== 100}
                        className="text-wrap truncate w-full hover:cursor-pointer"
                      >
                        New Game
                      </Button>
                      {process.env.NODE_ENV === 'development' && (
                        <Button
                          variant="secondary"
                          size="lg"
                          onClick={animateProgress}
                          className="animate-fade-in w-full hover:cursor-pointer"
                        >
                          Reload Animation
                        </Button>
                      )}
                      {getHighScore(modeSlug).value !== 0 && (
                        <Dialog open={confirmModalOpen} onOpenChange={setConfirmModalOpen}>
                          <DialogTrigger asChild>
                            <Button
                              variant="destructive"
                              className="text-wrap truncate w-full hover:cursor-pointer"
                            >
                              Clear High Score
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Clear High Score</DialogTitle>
                              <DialogDescription>{mode.title}</DialogDescription>
                            </DialogHeader>
                            <p className="text-md text-center">Are you sure?</p>
                            <DialogFooter className="flex flex-col-reverse justify-center sm:justify-between sm:flex-row gap-8 sm:gap-4">
                              <Button
                                variant="destructive"
                                onClick={() => {
                                  resetHighScore(modeSlug);
                                  playAgain();
                                }}
                                className="text-wrap truncate w-full hover:cursor-pointer"
                                disabled={coinInserted.current}
                              >
                                Yup!
                              </Button>
                              <Button
                                onClick={() => {
                                  setConfirmModalOpen(false);
                                }}
                                className="text-wrap truncate w-full hover:cursor-pointer"
                                disabled={coinInserted.current}
                              >
                                Nope!
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </>
  );
};

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

  // Stores
  const { rankLabel } = settingsStore();
  const { setHighScore, getHighScore, resetHighScore, _hasHydrated } = highScoreStore();

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
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('grid');
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  // Refs
  const tabsRef = useRef<HTMLDivElement>(null);
  const coinInserted = useRef(false);
  const highScoreBeaten = useRef(false);

  // Mode information
  const mode = ABMode.getMode(modeSlug)!;
  const { title, description, gridSize, type } = mode;

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

          newGrid[rowIndex][columnIndex].card = { ...sourceCard, faceUp: true } as ABCard;
          setPlayerHand([{ ...targetCard, faceUp: true } as ABCard]);
        } else {
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

    const newGrid = grid.map((row) =>
      row.map((cell) => ({
        ...cell,
        card: cell.card ? { ...cell.card, played: true } : null,
      }))
    ) as IABGridCell[][];

    setGrid(newGrid);
    setDiscardPile((prev) => [...prev, { ...abDiscard, faceUp: true }] as ABCards);
    await handleNextRound({ abDiscard, newGrid });
    setPlayerHand([]);

    if (isGridFull(newGrid)) {
      setGameState((prev) => ({ ...prev, gameOver: true }));
      return;
    }
  };

  const playAgain = async () => {
    setABGameOver(false);
    switchToGridTab();
    setGrid([]);
    setActiveDrag(null);
    setGameState(defaultGameState);
    setLockedCells(new Set());
    setIsDealing(true);
    await initGame(modeSlug);
    insertCoin();
    setDiscardPile([]);
  };

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

  // Effects
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
      <div className="backdrop-blur-xs bg-white/10 border-white/20 rounded-2xl p-4 md:p-8">
        <CardHeader className="text-white">
          <CardTitle className={cn('text-2xl md:text-3xl', '-mt-7')}>{title}</CardTitle>
          {description && (
            <CardDescription className="text-white/80 text-md md:text-lg">
              {description}
            </CardDescription>
          )}
        </CardHeader>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
          <div className="sm:col-span-2">
            {activeTab === 'grid' && (
              <div className="sm:sticky sm:top-0 h-auto bg-amber-950/30 rounded-2xl shadow-md flex flex-col gap-4">
                <div className="flex items-center justify-center gap-2 mb-2 mt-4 sm:hidden">
                  <h2 className="text-sm text-center font-bold">{playerHandText}</h2>
                </div>

                <PlayerHand
                  playerHand={playerHand}
                  isDealing={isDealing}
                  rankLabel={rankLabel}
                  modeType={type}
                  playerHandClass={playerHandClass}
                />

                <div className="flex items-center justify-center mt-1">
                  <div className="flex flex-col w-full p-2 -mt-8">
                    <div className="px-4">
                      <Separator className="mt-6 mb-4" />
                    </div>

                    <div className="mb-2">
                      <ActionButton
                        gameOver={gameOver}
                        isGridFull={isGridFull(grid)}
                        playerHand={playerHand}
                        isDealing={isDealing}
                        handleDiscard={handleDiscard}
                        playAgain={playAgain}
                        progress={progress}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="sm:col-span-8">
            <Tabs
              defaultValue="grid"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
              ref={tabsRef}
            >
              <TabsList className="grid w-full grid-cols-2 bg-transparent backdrop-blur-xs border-white/20 p-1 rounded-lg">
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
              <TabsContent value="grid">
                {!abCards || abCards.length === 0 ? (
                  <Placeholder />
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
                      <div className="hidden sm:block">
                        <HighScoreDisplay modeSlug={modeSlug} />
                      </div>
                    )}
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
            <>
              <div className="sm:col-span-2">
                {discardPile.length > 0 && (
                  <DiscardPile
                    cards={discardPile}
                    modeType={type}
                    rankLabel={!rankLabel}
                    gameOver={gameOver}
                  />
                )}
              </div>
              {getHighScore(modeSlug).value > 0 && _hasHydrated && (
                <div className="block sm:hidden">
                  <HighScoreDisplay modeSlug={modeSlug} />
                </div>
              )}
            </>
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
