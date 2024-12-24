'use client';

import { useEffect } from 'react';
import { SUITS } from '@annabelle/shared/src/types/suit';
import { io } from 'socket.io-client';
import { ABCard } from '@/components/ab-card';
import { SectionCard } from '@/components/section-card';
import { Button } from '@/components/ui/button';

export default function PlayingField() {
  const socket = io(`${process.env.serverUrl}`);

  const wsConnect = () => {
    socket.on('connect', () => {
      console.info('Connected to WebSocket server');
    });

    socket.on('hello-ws-res', (data) => {
      console.log(data.message);
    });

    return () => {
      socket.off('connect');
      socket.off(`hello-ws-res`);
    };
  };

  useEffect(() => {
    wsConnect();
  }, []);

  return (
    <SectionCard title="" className="w-fit h-full mt-7 rounded-3xl">
      <Button onClick={() => socket.emit('hello-ws', { name: 'Gaël' })} className="w-fit">
        Say hello
      </Button>
      <div className="p-4 sm:p-8 flex flex-wrap gap-4 sm:gap-8 items-center justify-center">
        <ABCard rank="A" suit={SUITS.SPADES} letter="J" />
        <ABCard rank="K" suit={SUITS.HEARTS} letter="Q" />
        <ABCard rank="Q" suit={SUITS.DIAMONDS} letter="K" />
        <ABCard rank="J" suit={SUITS.CLUBS} letter="A" />
        <ABCard rank="10" suit={SUITS.SPADES} letter="B" />
        <ABCard rank="9" suit={SUITS.HEARTS} letter="C" />
        <ABCard rank="8" suit={SUITS.DIAMONDS} letter="D" />
        <ABCard rank="7" suit={SUITS.CLUBS} letter="E" />
        <ABCard rank="6" suit={SUITS.SPADES} letter="F" />
        <ABCard rank="5" suit={SUITS.HEARTS} letter="G" />
        <ABCard rank="4" suit={SUITS.DIAMONDS} letter="H" />
        <ABCard rank="3" suit={SUITS.CLUBS} letter="I" />
        <ABCard rank="2" suit={SUITS.SPADES} letter="L" />
      </div>
    </SectionCard>
  );
}
