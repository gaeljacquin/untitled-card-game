'use client';

import { useEffect } from 'react';
import { io } from 'socket.io-client';
// import { ABCard as ABCardComp } from '@/components/ab-card';
import { SectionCard } from '@/components/section-card';
import { Button } from '@/components/ui/button';
import settingsStore from '@/stores/settings';

export default function PlayingField() {
  const socket = io(`${process.env.serverUrl}`);
  const { timer } = settingsStore();

  const wsConnect = () => {
    socket.on('connect', () => {
      console.info('Connected to WebSocket server');
    });

    socket.on('game-init-res', (data) => {
      console.log(data);
    });

    return () => {
      socket.off('connect');
      socket.off(`game-init-res`);
    };
  };

  useEffect(() => {
    wsConnect();
  }, []);

  return (
    <SectionCard title="" className="w-fit h-full mt-7 rounded-3xl">
      <Button onClick={() => socket.emit('game-init', { timer })} className="w-fit">
        Say hello
      </Button>
      <div className="p-4 sm:p-8 flex flex-wrap gap-4 sm:gap-8 items-center justify-center">
        <p>Starting Card</p>
        {/* <ABCardComp {...startingCard} /> */}
      </div>
      <div className="p-4 sm:p-8 flex flex-wrap gap-4 sm:gap-8 items-center justify-center">
        <p>Cards in Hand</p>
        {/* {newCards.map((newCard) => (
          <ABCardComp key={crypto.randomUUID()} {...newCard} />
        ))} */}
      </div>
    </SectionCard>
  );
}
