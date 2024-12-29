'use client';

import AnimatedLogoDynamic from '@/components/animated-logo-dynamic';
import AudioControlsDynamic from '@/components/audio-controls-dynamic';
import { BasicRules } from '@/components/basic-rules';
import { GamePhases } from '@/components/game-phases';
import { HandRankings } from '@/components/hand-rankings';
import { OtherRules } from '@/components/other-rules';
import { cn } from '@/lib/utils';

export default function HowToPlay() {
  return (
    <>
      <div className="fixed inset-0 bg-center opacity-50 flex items-center justify-center pointer-events-none">
        <span
          className={cn(
            'flex items-center justify-center w-[56rem] h-auto',
            'bg-transparent grayscale'
          )}
        >
          <AnimatedLogoDynamic logo={'game'} loop={false} autoplay={false} />
        </span>
      </div>
      <div className="relative container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <h1 className="text-2xl font-semibold text-white">How to Play</h1>
            <AudioControlsDynamic className="space-y-8 bg-white/10 backdrop-blur-sm rounded-2xl p-8 mt-3" />
          </div>
          <BasicRules />
          <HandRankings />
          <GamePhases />
          <OtherRules />
        </div>
      </div>
    </>
  );
}
