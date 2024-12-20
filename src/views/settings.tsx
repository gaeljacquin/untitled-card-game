'use client';

import { SectionCard } from '@/components/section-card';
import SettingsForm from '@/forms/settings';

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 mt-16">
      <SectionCard title="Settings" className="text-center text-white p-4">
        <SettingsForm />
      </SectionCard>
    </div>
  );
}
