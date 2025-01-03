'use client';

import Image from 'next/image';
import { Coins } from 'lucide-react';
import AnimatedLogoDynamic from '@/components/animated-logo-dynamic';
import AudioControlsDynamic from '@/components/audio-controls-dynamic';
import SectionCard from '@/components/section-card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export default function HowToPlay() {
  const rankings = [
    { name: 'Royal Flush', description: 'A, K, Q, J, 10 of the same suit' },
    { name: 'Straight Flush', description: 'Five consecutive cards of the same suit' },
    { name: 'Four of a Kind', description: 'Four cards of the same rank' },
    { name: 'Full House', description: 'Three of a kind plus a pair' },
    { name: 'Flush', description: 'Any five cards of the same suit' },
  ];
  const phases = [
    {
      name: 'Phase One',
      description: 'Lorem ipsum 1 2 3 4 5 6 7',
    },
    {
      name: 'Phase Two',
      description: 'Lorem ipsum 1 2 3 4 5 6 7',
    },
    {
      name: 'Phase Three',
      description: 'Lorem ipsum 1 2 3 4 5 6 7',
    },
    {
      name: 'Phase Four',
      description: 'Lorem ipsum 1 2 3 4 5 6 7',
    },
    {
      name: 'Phase Five',
      description: 'Lorem ipsum 1 2 3 4 5 6 7',
    },
  ];
  const actions = [
    {
      name: 'Rule One',
      description: 'Lorem ipsum 1 2 3 4 5 6 7',
    },
    {
      name: 'Rule Two',
      description: 'Lorem ipsum 1 2 3 4 5 6 7',
    },
    {
      name: 'Rule Three',
      description: 'Lorem ipsum 1 2 3 4 5 6 7',
    },
    {
      name: 'Rule Four',
      description: 'Lorem ipsum 1 2 3 4 5 6 7',
    },
    {
      name: 'Rule Five',
      description: 'Lorem ipsum 1 2 3 4 5 6 7',
    },
  ];

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-50 z-0">
        <span className={cn('w-[56rem] h-auto', 'bg-transparent grayscale')}>
          <AnimatedLogoDynamic logo={'game'} loop={false} autoplay={false} />
        </span>
      </div>

      <div className="container max-w-4xl mx-auto space-y-8 mt-16 mb-16 relative z-10">
        <SectionCard title="How to Play" className="flex flex-col text-center text-white p-4">
          <h3 className="text-center text-lg mb-4">Basic Rules</h3>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4 text-white">
              <h3 className="text-lg font-semibold">Getting Started</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Each player receives two private cards (hole cards)</li>
                <li>Five community cards are dealt face-up on the table</li>
                <li>Players make the best five-card hand using any combination</li>
                <li>The player with the best hand wins</li>
              </ul>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image src="/fireworks.jpg" alt="Placeholder" fill className="object-cover" />
            </div>
          </div>

          <Separator className="my-8" />

          <h3 className="text-center text-lg mb-4">Hand Rankings</h3>

          <div className="grid md:grid-cols-2 gap-8 text-white">
            <div className="space-y-6">
              {rankings.map((rank) => (
                <div key={rank.name} className="space-y-1">
                  <h4 className="font-semibold text-lg">{rank.name}</h4>
                  <p>{rank.description}</p>
                </div>
              ))}
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/fireworks.jpg"
                alt="Hand Rankings Placeholder"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <Separator className="my-8" />

          <h3 className="text-center text-lg mb-4">Game phases</h3>

          <div className="grid md:grid-cols-2 gap-8 text-white">
            <div className="space-y-6 text-white">
              {phases.map((phase, index) => (
                <div key={phase.name} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <span className="text-amber-200 font-semibold">{index + 1}</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-semibold text-lg">{phase.name}</h4>
                    <p className="">{phase.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/fireworks.jpg"
                alt="Basic Rules Placeholder"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <Separator className="my-8" />

          <h3 className="text-center text-lg mb-4">Other Rules</h3>

          <div className="grid md:grid-cols-2 gap-8 text-white">
            <div className="space-y-6">
              {actions.map((action) => (
                <div key={action.name} className="flex items-start gap-3">
                  <Coins className="w-5 h-5 mt-1 text-amber-200" />
                  <div>
                    <h4 className="font-semibold">{action.name}</h4>
                    <p className="text-sm">{action.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-amber-950/30 rounded-lg p-6">
              <h4 className="font-semibold mb-4">Tips</h4>
              <ul className="list-disc list-inside space-y-3 text-sm">
                <li>Lorem ipsum 1 2 3 4 5 6 7 8 9 abcdef</li>
                <li>Lorem ipsum 1 2 3 4 5 6 7 8 9 abcdef</li>
                <li>Lorem ipsum 1 2 3 4 5 6 7 8 9 abcdef</li>
                <li>Lorem ipsum 1 2 3 4 5 6 7 8 9 abcdef</li>
                <li>Lorem ipsum 1 2 3 4 5 6 7 8 9 abcdef</li>
              </ul>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="container max-w-4xl mx-auto space-y-8 mt-16 mb-16">
        <AudioControlsDynamic className="space-y-8 flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 mt-3 border border-gray-200/20" />
      </div>
    </>
  );
}
