'use client';

import { useRef } from 'react';
import {
  ABMode,
  evaluateGridColumn,
  evaluateGridRow,
  IABGridCell,
  SlugId,
} from '@untitled-card-game/shared';
import { AnimatePresence, motion } from 'motion/react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useUcgStore } from '@/stores/ucg-store';
import { GameState } from '@/types/game-state';

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
}: {
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
}) => {
  const highScoreBeaten = useRef(false);
  const { getHighScore } = useUcgStore();

  return (
    <>
      {gameOver && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 text-white w-full max-w-2xl mx-auto min-h-[50vh] flex items-center justify-center"
        >
          {progress !== 100 && (
            <div className="flex flex-col gap-2 text-white space-y-2">
              <h1 className="text-center text-xl font-bold">Calculating Score</h1>
              <Progress value={progress} className="h-4 bg-white/20" />
            </div>
          )}

          <AnimatePresence>
            {progress === 100 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="flex flex-col gap-4 w-full">
                  <AnimatePresence>
                    {highScoreBeaten.current && (
                      <>
                        <p className="text-md text-center">You just set a new high score! 🤩</p>
                        <Separator />
                      </>
                    )}
                    {Array.from({ length: gridSize }, (_, index) => (
                      <motion.div
                        key={`col-${index}`}
                        className="text-center font-semibold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <p className="flex items-center justify-between gap-4 text-base md:text-md">
                          <span className="min-w-[80px] text-left">Column {index + 1}</span>
                          <span className="flex-1 text-center">
                            {evaluateGridColumn(grid, index).name}
                          </span>
                          <span className="min-w-[60px] text-right">
                            ${evaluateGridColumn(grid, index).points}
                          </span>
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
                        <p className="flex items-center justify-between gap-4 text-base md:text-md">
                          <span className="min-w-[80px] text-left">Row {index + 1}</span>
                          <span className="flex-1 text-center">
                            {evaluateGridRow(grid, index).name}
                          </span>
                          <span className="min-w-[60px] text-right">
                            ${evaluateGridRow(grid, index).points}
                          </span>
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
                      <p className="flex items-center justify-between gap-4 text-base md:text-md">
                        <span className="min-w-[80px] text-left">Grid Total</span>
                        <span className="flex-1"></span>
                        <span className="min-w-[60px] text-right">${gameState.score}</span>
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
                      <p className="flex items-center justify-between gap-4 text-base md:text-md">
                        <span className="min-w-[80px] text-left">Discard Bonus</span>
                        <span className="flex-1 text-center">
                          {gameState.discardBonus?.points > 0 && gameState.discardBonus?.name}
                        </span>
                        <span className="min-w-[60px] text-right">
                          ${gameState.discardBonus?.points ?? 0}
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
                      <p className="flex items-center justify-between gap-4 text-base md:text-md">
                        <span className="min-w-[80px] text-left">Special Bonus</span>
                        <span className="flex-1 text-center">
                          {gameState.specialBonus?.points > 0 && gameState.specialBonus?.name}
                        </span>
                        <span className="min-w-[60px] text-right">
                          ${gameState.specialBonus?.points}
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
                      <p className="flex items-center justify-between gap-4 text-lg font-bold">
                        <span className="min-w-[80px] text-left">Overall Score</span>
                        <span className="flex-1"></span>
                        <span className="min-w-[60px] text-right">
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
                  <div className="flex flex-col items-center justify-center mt-8 gap-5">
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
      )}
    </>
  );
};

export default ScoreDisplay;
