'use client';

import { useEffect, useState } from 'react';
import { ABCard } from '@annabelle/shared/core/card';
import { ABGame } from '@annabelle/shared/core/game';
import AudioControlsDynamic from '@/components/audio-controls-dynamic';
import BackgroundLogo from '@/components/background-logo';
import Placeholder from '@/components/placeholder';
import PlayingField from '@/components/playing-field';
import socketInit from '@/utils/socket-init';

export default function Game() {
  const socket = socketInit();
  const [startingCard, setStartingCard] = useState<ABCard | null>(null);
  const [playerCards, setPlayerCards] = useState<ABCard[]>([]);
  const game = new ABGame();

  const wsConnect = () => {
    socket.on('connect', () => {
      console.info('Connected to server');
    });

    socket.on('game-init-res', (data) => {
      const { startingCard, playerCards } = data;
      setStartingCard(startingCard);
      setPlayerCards(playerCards);
    });

    return () => {
      socket.off('connect');
      socket.off(`game-init-res`);
    };
  };

  useEffect(() => {
    socket.emit('game-init', { game });
    wsConnect();
  }, []);

  if (!(startingCard && playerCards.length > 0)) {
    return <Placeholder />;
  }

  return (
    <>
      <BackgroundLogo />

      <PlayingField startingCard={startingCard} playerCards={playerCards} />

      <div className="max-w-4xl mx-auto space-y-8 mt-16 mb-16">
        <AudioControlsDynamic className="space-y-8 flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 mt-20 border border-gray-200/50" />
      </div>
    </>
  );
}
