'use client';

import dynamic from 'next/dynamic';
import { jokerIcons } from '@annabelle/shared/constants/joker-icon';
import { IconType } from 'react-icons';
import AudioControlsDynamic from '@/components/audio-controls-dynamic';
import BackgroundLogo from '@/components/background-logo';
import SectionCard from '@/components/section-card';
import ABChecker from '@/forms/ab-checker';
import { cn } from '@/lib/utils';

const ABJokerCard = dynamic(() => import('@/components/ab-joker-card'), {
  ssr: false,
});

export default function ABTools() {
  return (
    <>
      <BackgroundLogo />

      <div className="max-w-4xl mx-auto space-y-8 mt-16 mb-16 relative z-10">
        <SectionCard title="AB Checker" className="flex flex-col text-center text-white p-4">
          <ABChecker />
        </SectionCard>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 mt-16 mb-16">
        <SectionCard title="Lookin' cool Joker" className="text-center text-white p-4">
          <div className="flex flex-row items-center justify-center gap-7 text-center mb-7">
            <ABJokerCard preview={true} />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-7 text-center bg-black\50 backdrop-blur-sm rounded-2xl p-2">
            {jokerIcons.map((Icon: IconType) => (
              <Icon key={crypto.randomUUID()} className={cn('h-auto', 'w-10 sm:w-12 md:w-24')} />
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 mt-16 mb-16">
        <AudioControlsDynamic className="space-y-8 flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 mt-3 border border-gray-200/20" />
      </div>
    </>
  );
}
