'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, ChevronsDown, ChevronsUp, X } from 'lucide-react';
import AnimatedLogoDynamic from '@/components/animated-logo-dynamic';
import { SectionCard } from '@/components/section-card';
import { TerminalDisplay } from '@/components/terminal-display';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Separator } from '@/components/ui/separator';

export function GameSidebar() {
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);
  const totalScore = -20;
  const currentScore = 15;
  const validWords = 8;
  const invalidWords = 1;
  const discards = 0;
  const currentStreak = 3;
  const maxStreak = 4;
  const highScore = 250;
  const playedWords = [
    { word: 'one', valid: true },
    { word: 'two', valid: true },
    { word: 'three', valid: true },
    { word: 'four', valid: true },
    { word: 'five', valid: true },
    { word: 'six', valid: true },
    { word: 'seven', valid: true },
    { word: 'eight', valid: true },
    { word: 'nein', valid: false },
  ];

  return (
    <>
      <SectionCard title="" className="w-80 h-full mt-7 rounded-3xl">
        <div className="flex flex-col items-center justify-center -mt-24 -mb-12">
          <span className="w-48 h-48">
            <AnimatedLogoDynamic logo={'game'} loop={false} />
          </span>
        </div>

        <div className="space-y-6 text-white">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Objective</h3>
            <ul>
              <li className="text-sm">Placeholder objective</li>
            </ul>
          </div>

          <Separator />

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Side Quests</h3>
            <ul>
              <li className="text-sm">Placeholder side quest 1</li>
              <li className="text-sm">Placeholder side quest 2</li>
              <li className="text-sm">Placeholder side quest 3</li>
            </ul>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Stats</h3>
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col items-center justify-center w-full">
                  <span className="text-sm">Current Score</span>
                  <TerminalDisplay
                    value={currentScore}
                    noBueno={currentScore < 0}
                    className="flex w-full"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                  <span className="text-sm">Discards</span>
                  <TerminalDisplay
                    value={discards}
                    noBueno={discards > 0}
                    className="flex w-full"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col items-center justify-center w-full">
                  <span className="text-sm">Valid Words</span>
                  <TerminalDisplay value={validWords} className="flex w-full" />
                </div>
                <div className="flex flex-col items-center justify-center w-full">
                  <span className="text-sm">Invalid Words</span>
                  <TerminalDisplay
                    value={invalidWords}
                    noBueno={invalidWords > 0}
                    className="flex w-full"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col items-center justify-center w-full">
                  <span className="text-sm">Total Score</span>
                  <TerminalDisplay
                    value={totalScore}
                    noBueno={totalScore < 0}
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
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col items-center justify-center w-full">
                          <span className="text-sm">Max Streak</span>
                          <TerminalDisplay value={maxStreak} className="flex w-full" />
                        </div>
                        <div className="flex flex-col items-center justify-center w-full">
                          <span className="text-sm">Current Streak</span>
                          <TerminalDisplay value={currentStreak} className="flex w-full" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-col items-center justify-center w-full">
                          <span className="text-sm">High Score</span>
                          <TerminalDisplay value={highScore} className="flex w-full" />
                        </div>
                      </div>
                    </motion.section>
                  )}
                </AnimatePresence>
              </>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Words Found</h3>
            <Command className="bg-black/50 border-white/20">
              <CommandList className="w-full mt-2 h-36">
                <CommandGroup>
                  {playedWords.map((item, index) => {
                    return (
                      <CommandItem
                        className="flex items-center justify-between text-white aria-selected:text-black text-md"
                        key={item.word + '-' + index}
                        value={item.word}
                      >
                        <span>{item.word.toLocaleUpperCase()}</span>
                        <span>{item.valid ? <CheckCircle /> : <X />}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Actions</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="default">Claim</Button>
              <Button variant="default">Button 1</Button>
              <Button variant="destructive">Discard</Button>
              <Button variant="outline" className="text-black">
                Button 2
              </Button>
            </div>
          </div>
        </div>
      </SectionCard>
    </>
  );
}
