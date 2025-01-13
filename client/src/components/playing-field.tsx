'use client';

import { Fragment, useEffect, useState } from 'react';
import { ABCard, ABCards, ABJoker } from '@annabelle/shared/core/card';
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
import ABJokerComp from '@/components/ab-joker';
import DiscardPile from '@/components/discard-pile';
import { GridCell } from '@/components/grid-cell';
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
  gameOver?: boolean;
  abResult: {
    [key: string]: {
      word: string;
      match: string;
      points_final: number;
    };
  } | null;
  handleNextRound: (arg0: { [key: string]: unknown }) => void;
  evaluateColumn: (arg0: IGridCell[][], arg1: number) => { name: string; points: number };
  evaluateRow: (arg0: IGridCell[][], arg1: number) => { name: string; points: number };
  evaluateSpecial: (arg0: IGridCell[][]) => { name: string; points: number };
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
const cornerCellClass = cn('aspect-none', 'w-auto h-auto');

export default function PlayingField(props: Props) {
  const {
    modeSlug,
    abCards,
    gridClass,
    playerHandClass,
    gameOver = false,
    abResult,
    handleNextRound,
    evaluateColumn,
    evaluateRow,
    initGame,
    setABGameOver,
  } = props;
  const defaultGameState = {
    gameOver: false,
    totalCards: abCards.length,
    playedCards: 0,
    totalScore: 0,
    bonusPoints: 0,
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
    if (gameOver && abResult) {
      const totalScore = evaluateTotalPokerScore(grid);
      const bonusPoints = Object.values(abResult).reduce((sum, item) => sum + item.points_final, 0);
      setGameState((prev) => ({
        ...prev,
        totalScore: totalScore + bonusPoints,
        bonusPoints: bonusPoints,
      }));
    }
  }, [gameOver]);

  useEffect(() => {
    const totalScore = evaluateTotalPokerScore(grid);
    setGameState((prev) => ({
      ...prev,
      totalScore,
    }));
  }, [grid]);

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

            {!abCards || abCards.length === 0 ? (
              <Placeholder />
            ) : (
              <div className={gridClass}>
                <div className={cornerCellClass} />

                {Array.from({ length: gridSize }, (_, colIndex) => (
                  <div key={`col-${colIndex}`} className={labelClass}>
                    <motion.div>
                      <span className="text-clip">{evaluateColumn(grid, colIndex).name}:</span>
                      <br />
                      <span className="text-clip">${evaluateColumn(grid, colIndex).points}</span>
                    </motion.div>
                  </div>
                ))}

                {grid.map((row, rowIndex) => (
                  <Fragment key={`row-${rowIndex}`}>
                    <div className={labelClass}>
                      <motion.div>
                        <span className="text-clip">{evaluateRow(grid, rowIndex).name}:</span>
                        <br />
                        <span className="text-clip">${evaluateRow(grid, rowIndex).points}</span>
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
            )}
          </div>

          <div className="sm:col-span-2">
            <div className="h-auto border border-4 border-dashed rounded-2xl p-4">
              <div className={playerHandClass}>
                {isDealing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    {gameOver && <p>Final score: ${gameState.totalScore}</p>}
                    <SortableContext
                      items={playerHand.map((item) => item.id)}
                      strategy={horizontalListSortingStrategy}
                    >
                      {playerHand.map((item) => (
                        <SortableItem key={item.id} id={item.id}>
                          {item.suit.id === 'joker' ? (
                            <ABJokerComp
                              key={`card-${item.id}`}
                              card={item as ABJoker}
                              hover={true}
                              isDragging
                              inGrid={false}
                            />
                          ) : (
                            <ABCardComp
                              key={`card-${item.id}`}
                              card={item}
                              valueNotLabel={!labelNotValue}
                              modeType={type}
                              hover={true}
                              isDragging
                              inGrid={false}
                            />
                          )}
                        </SortableItem>
                      ))}
                    </SortableContext>
                  </>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex items-center justify-center">
                {gameOver ? (
                  <Button onClick={playAgain} disabled>
                    Play Again
                  </Button>
                ) : (
                  <Button onClick={handleDiscard} disabled={playerHand.length !== 1 || isDealing}>
                    Discard
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeDrag ? (
          activeDrag.suit.id === 'joker' ? (
            <ABJokerComp card={activeDrag} />
          ) : (
            <ABCardComp card={activeDrag} valueNotLabel={!labelNotValue} modeType={type} />
          )
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
