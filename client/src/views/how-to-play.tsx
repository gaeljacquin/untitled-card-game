'use client';

import AnimatedLogoDynamic from '@/components/animated-logo-dynamic';
import { BasicRules } from '@/components/basic-rules';
import { GamePhases } from '@/components/game-phases';
import { HandRankings } from '@/components/hand-rankings';
import { OtherRules } from '@/components/other-rules';
import { cn } from '@/lib/utils';

export default function HowToPlay() {
  return (
    <div className="relative container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <h1 className="text-2xl font-semibold text-white">How to Play</h1>
        </div>
        <BasicRules />
        <HandRankings />
        <GamePhases />
        <OtherRules />
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <span className={cn('w-[32rem]', 'bg-transparent')}>
            <AnimatedLogoDynamic logo={'game'} loop={false} autoplay={false} />
          </span>
        </div>
      </div>
    </div>
  );
}
