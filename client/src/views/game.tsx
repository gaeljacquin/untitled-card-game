'use client';

import { useEffect, useState } from 'react';
import { ABCard } from '@annabelle/shared/src/core/card';
import { ABGame } from '@annabelle/shared/src/core/game';
import { Timer } from '@annabelle/shared/src/core/timer';
import { io } from 'socket.io-client';
import AnimatedLogoDynamic from '@/components/animated-logo-dynamic';
import AudioPlayer from '@/components/audio-player';
import GameSidebar from '@/components/game-sidebar';
import Placeholder from '@/components/placeholder';
import PlayingField from '@/components/playing-field';
import { cn } from '@/lib/utils';
import settingsStore from '@/stores/settings';

export default function Game() {
  const socket = io(`${process.env.serverUrl}`);
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
      <AudioPlayer />
    </>
  );
}
