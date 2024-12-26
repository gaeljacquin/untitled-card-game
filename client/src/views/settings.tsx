'use client';

import AnimatedLogoDynamic from '@/components/animated-logo-dynamic';
import { SectionCard } from '@/components/section-card';
import SettingsForm from '@/forms/settings';
import { cn } from '@/lib/utils';

export default function Settings() {
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
      <div className="max-w-4xl mx-auto space-y-8 mt-16">
        <SectionCard title="Settings" className="text-center text-white p-4">
          <SettingsForm />
        </SectionCard>
      </div>
    </>
  );
}
