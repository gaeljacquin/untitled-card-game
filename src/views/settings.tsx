'use client';

import AnimatedLogoDynamic from '@/components/animated-logo-dynamic';
import { SectionCard } from '@/components/section-card';
import SettingsForm from '@/forms/settings';
import { cn } from '@/lib/utils';

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 mt-16">
      <SectionCard title="Settings" className="text-center text-white p-4">
        <SettingsForm />
      </SectionCard>

      <div className="flex flex-col items-center justify-center">
        <span className={cn('w-[32rem] h-44', 'bg-transparent')}>
          <AnimatedLogoDynamic logo={'game'} loop={false} />
        </span>
      </div>
    </div>
  );
}
