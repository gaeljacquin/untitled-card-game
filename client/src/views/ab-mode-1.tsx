'use client';

import { useEffect, useState } from 'react';
import { ABCard } from '@annabelle/shared/core/card';
import { ABGame } from '@annabelle/shared/core/game';
import { motion } from 'framer-motion';
import AudioControlsDynamic from '@/components/audio-controls-dynamic';
import BackgroundLogo from '@/components/background-logo';
import Footer from '@/components/footer';
import Placeholder from '@/components/placeholder';
import PlayingField from '@/components/playing-field';
import socketInit from '@/utils/socket-init';

const MODE_INFO = {
  title: 'Poker (4 x 4)',
  description: 'Make the best poker hands in a 4 x 4 grid!',
  gridSize: 4,
  className: 'grid-cols-[auto,repeat(4,1fr)]',
};

export default function ABMode1() {
  const socket = socketInit();
  const [playerCards, setPlayerCards] = useState<ABCard[]>([]);
  const game = new ABGame();

  const wsConnect = () => {
    socket.on('connect', () => {
      console.info('Connected to server');
    });

    socket.on('game-init-res', (data) => {
      const { playerCards } = data;
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

  if (!(playerCards.length > 0)) {
    return <Placeholder />;
  }

  return (
    <>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <BackgroundLogo />

        <PlayingField modeInfo={MODE_INFO} playerCards={playerCards} />

        <div className="mt-32">
          <Footer />
        </div>
      </motion.div>

      <AudioControlsDynamic />
    </>
  );
}
