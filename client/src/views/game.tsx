'use client';

import { useEffect, useState } from 'react';
import { ABCard, ABGame, Timer } from '@annabelle/shared';
import AnimatedLogoDynamic from '@/components/animated-logo-dynamic';
import AudioControlsDynamic from '@/components/audio-controls-dynamic';
import GameSidebar from '@/components/game-sidebar';
import Placeholder from '@/components/placeholder';
import PlayingField from '@/components/playing-field';
import { cn } from '@/lib/utils';
import settingsStore from '@/stores/settings';
import socketInit from '@/utils/socket-init';

export default function Game() {
  const socket = socketInit();
  const { timer } = settingsStore();
  const [startingCard, setStartingCard] = useState<ABCard | null>(null);
  const [playerCards, setPlayerCards] = useState<ABCard[]>([]);
  const game = new ABGame(timer as Timer);

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
      <div className="flex flex-row gap-4 justify-between">
        <GameSidebar game={game} />
        <PlayingField startingCard={startingCard} playerCards={playerCards} />
      </div>
      <AudioControlsDynamic className="space-y-8 flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm rounded-2xl p-4 mt-20 border border-gray-200/50" />
    </>
  );
}
