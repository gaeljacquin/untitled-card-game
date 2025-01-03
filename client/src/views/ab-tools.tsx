'use client';

import dynamic from 'next/dynamic';
import { jokerIcons } from '@annabelle/shared/constants/joker-icon';
import { IconType } from 'react-icons';
import AnimatedLogoDynamic from '@/components/animated-logo-dynamic';
import AudioControlsDynamic from '@/components/audio-controls-dynamic';
import SectionCard from '@/components/section-card';
import ABChecker from '@/forms/ab-checker';
import { cn } from '@/lib/utils';

const ABJokerCard = dynamic(() => import('@/components/ab-joker-card'), {
  ssr: false,
});

export default function ABTools() {
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
      <div className="max-w-4xl mx-auto space-y-8 mt-16 mb-16">
        <SectionCard title="AB Checker" className="flex flex-col text-center text-white p-4">
          <ABChecker />
        </SectionCard>
      </div>
      <div className="max-w-4xl mx-auto space-y-8 mt-16 mb-16">
        <SectionCard title="Lookin' cool Joker" className="text-center text-white p-4">
          <div className="flex flex-row items-center justify-center gap-7 text-center mb-7">
            <ABJokerCard preview={true} />
          </div>
          <div className="flex flex-row items-center justify-center gap-7 text-center bg-black\50 backdrop-blur-sm rounded-2xl p-2">
            {jokerIcons.map((Icon: IconType) => (
              <Icon key={crypto.randomUUID()} className={cn('h-auto', 'w-24')} />
            ))}
          </div>
        </SectionCard>
      </div>
      <div className="max-w-4xl mx-auto mb-16">
        <AudioControlsDynamic className="space-y-8 bg-white/10 backdrop-blur-sm rounded-2xl p-8 mt-3 border border-gray-200/20" />
      </div>
    </>
  );
}
