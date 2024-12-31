'use client';

import { useEffect } from 'react';
import { ABCard } from '@annabelle/shared/src/core/card';
import { io } from 'socket.io-client';
import AnimatedLogoDynamic from '@/components/animated-logo-dynamic';
import AudioControlsDynamic from '@/components/audio-controls-dynamic';
import SectionCard from '@/components/section-card';
import ABChecker from '@/forms/ab-checker';
import SettingsForm from '@/forms/settings';
import { cn } from '@/lib/utils';
import settingsStore from '@/stores/settings';

export default function Settings() {
  const socket = io(`${process.env.serverUrl}`);
  const { setAbCheckStatus } = settingsStore();

  const wsConnect = () => {
    socket.on('connect', () => {
      console.info('Connected to server');
    });

    socket.on('ab-check-res', (data) => {
      setAbCheckStatus({
        abWord: data.abWord,
        valid: data.valid,
      });
    });

    return () => {
      socket.off('connect');
      socket.off('ab-check-res');
    };
  };

  const abSend = (abCards: ABCard[]) => {
    socket.emit('ab-check', { abCards });
  };

  useEffect(() => {
    wsConnect();
  }, []);

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
        <SectionCard title="Settings" className="flex flex-col text-center text-white p-4">
          <SettingsForm />
        </SectionCard>
      </div>
      <div className="max-w-4xl mx-auto space-y-8 mt-16 mb-16">
        <SectionCard title="AB Checker" className="flex flex-col text-center text-white p-4">
          <ABChecker wsConnect={wsConnect} abSend={abSend} />
        </SectionCard>
      </div>
      <div className="max-w-4xl mx-auto mt-16 mb-16">
        <SectionCard title="" className="flex flex-col text-center text-white p-4">
          <AudioControlsDynamic className="space-y-8 flex flex-col items-center justify-center -mt-8" />
        </SectionCard>
      </div>
    </>
  );
}
