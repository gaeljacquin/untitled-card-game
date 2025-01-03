'use client';

import { useEffect, useState } from 'react';
import { ABGame, ABSideQuest, ABWord } from '@annabelle/shared';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, ChevronsDown, ChevronsUp, CircleX } from 'lucide-react';
import Placeholder from '@/components/placeholder';
import SectionCard from '@/components/section-card';
import { TerminalDisplay } from '@/components/terminal-display';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Separator } from '@/components/ui/separator';
import statsStore from '@/stores/stats';

export default function GameSidebar({ game }: { game: ABGame }) {
  const mainQuest = game.getMainQuest();
  const sideQuests = game.getSideQuests();
  const {
    currentStreak,
    bestStreak,
    highScore,
    _hasHydrated,
    /* updateBestStreak,
     updateHighScore,*/
  } = statsStore();
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);
  const [gameState, setGameState] = useState({
    score: 0,
    validWords: 0,
    invalidWords: 0,
    collected: 0,
    discards: 0,
    playedWords: [],
  });
  void setGameState;

  useEffect(() => {
    console.log('there');
  }, []);

  if (!_hasHydrated) {
    return <Placeholder />;
  }

  return (
    <SectionCard title="" className="w-1/2 mt-7 rounded-3xl">
      <div className="space-y-6 text-white">
        <div className="space-y-2 -mt-6">
          <h3 className="text-lg font-semibold">Main Quest</h3>
          <ul>
            <li className="text-sm">{mainQuest.label ?? ''}</li>
          </ul>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Side Quests</h3>
          <ul>
            {sideQuests.length > 0 &&
              sideQuests.map((item: ABSideQuest) => (
                <li className="text-sm" key={item.id}>
                  {item.label}
                </li>
              ))}
          </ul>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col items-center justify-center w-full">
              <span className="text-sm">Collected</span>
              <TerminalDisplay value={gameState.collected} className="flex w-full" />
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <span className="text-sm">Discards</span>
              <TerminalDisplay
                value={gameState.discards}
                noBueno={gameState.discards > 0}
                className="flex w-full"
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col items-center justify-center w-full">
              <span className="text-sm">Valid Words</span>
              <TerminalDisplay value={gameState.validWords} className="flex w-full" />
            </div>
            <div className="flex flex-col items-center justify-center w-full">
              <span className="text-sm">Invalid Words</span>
              <TerminalDisplay
                value={gameState.invalidWords}
                noBueno={gameState.invalidWords > 0}
                className="flex w-full"
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col items-center justify-center w-full">
              <span className="text-sm">Score</span>
              <TerminalDisplay
                value={gameState.score}
                noBueno={gameState.score < 0}
                className="flex w-full"
              />
            </div>
          </div>
          <>
            <motion.header initial={false} onClick={() => setCollapsibleOpen(!collapsibleOpen)}>
              <div className="flex items-center justify-center space-x-4 mt-4">
                <div
                  className="flex items-center justify-center space-x-2 border border-gray-200 rounded-lg px-2 w-full"
                  role="button"
                >
                  <p className="text-sm font-light w-full">
                    {collapsibleOpen ? 'Hide' : 'Show More'}
                  </p>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    {collapsibleOpen ? (
                      <ChevronsUp className="h-4 w-4" />
                    ) : (
                      <ChevronsDown className="h-4 w-4" />
                    )}
                    <span className="sr-only">Toggle</span>
                  </Button>
                </div>
              </div>
            </motion.header>
            <AnimatePresence initial={false}>
              {collapsibleOpen && (
                <motion.section
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={{
                    open: { opacity: 1, height: 'auto' },
                    collapsed: { opacity: 0, height: 0 },
                  }}
                  transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-col items-center justify-center w-full">
                        <span className="text-sm">Best Streak</span>
                        <TerminalDisplay value={bestStreak} className="flex w-full" />
                      </div>
                      <div className="flex flex-col items-center justify-center w-full">
                        <span className="text-sm">Streak</span>
                        <TerminalDisplay value={currentStreak} className="flex w-full" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-col items-center justify-center w-full">
                        <span className="text-sm">High Score</span>
                        <TerminalDisplay value={highScore} className="flex w-full" />
                      </div>
                    </div>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Words Played</h3>
          <Command className="bg-black/50 border-white/20">
            <CommandList className="w-full mt-2 h-36">
              <CommandGroup>
                {gameState.playedWords.length > 0 &&
                  gameState.playedWords.map((item: ABWord, index) => {
                    const word = item.getWord();
                    const valid = item.getValid();

                    return (
                      <CommandItem
                        className="flex items-center justify-between text-white aria-selected:text-black text-md"
                        key={word + '-' + index}
                        value={word}
                      >
                        <span>{word.toLocaleUpperCase()}</span>
                        <span>
                          {valid ? <CheckCircle /> : <CircleX className="text-red-500" />}
                        </span>
                      </CommandItem>
                    );
                  })}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>
    </SectionCard>
  );
}
