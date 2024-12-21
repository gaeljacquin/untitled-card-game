'use client';

import AnimatedLogoDynamic from '@/components/animated-logo-dynamic';
import { BasicRules } from '@/components/basic-rules';
import { GamePhases } from '@/components/game-phases';
import { HandRankings } from '@/components/hand-rankings';
import { OtherRules } from '@/components/other-rules';

export default function HowToPlay() {
  return (
    <div className="relative container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <h1 className="text-2xl font-semibold text-white">How to Play</h1>
          <span className="w-64 h-64 -mt-16 -mb-20">
            <AnimatedLogoDynamic logo={'game'} loop={false} />
          </span>{' '}
        </div>
        <BasicRules />
        <HandRankings />
        <GamePhases />
        <OtherRules />
      </div>
    </div>
  );
}
