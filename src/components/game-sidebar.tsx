'use client';

import { CheckCircle, X } from 'lucide-react';
import AnimatedLogoDynamic from '@/components/animated-logo-dynamic';
import { SectionCard } from '@/components/section-card';
import { TerminalDisplay } from '@/components/terminal-display';
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command';
import { Separator } from '@/components/ui/separator';

export function GameSidebar() {
  const points = -20;
  const validWords = 8;
  const invalidWords = 1;
  const discards = 0;
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
            <h3 className="text-lg font-semibold">Main Objectives</h3>
            <ul>
              <li className="text-sm">Placeholder objective 1</li>
              <li className="text-sm">Placeholder objective 2</li>
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
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">Points</span>
                <TerminalDisplay value={points} noBueno={points < 0} />
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">Valid words</span>
                <TerminalDisplay value={validWords} />
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">Invalid words</span>
                <TerminalDisplay value={invalidWords} noBueno={invalidWords > 0} />
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">Discards</span>
                <TerminalDisplay value={discards} noBueno={discards > 0} />
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Played Words</h3>
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
