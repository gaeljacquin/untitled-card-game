'use client';

import { useEffect, useState } from 'react';
import { ABCards } from '@annabelle/shared/core/card';
import { ABGame } from '@annabelle/shared/core/game';
import { ABMode } from '@annabelle/shared/core/mode';
import { motion } from 'framer-motion';
import AudioControlsDynamic from '@/components/audio-controls-dynamic';
import BackgroundLogo from '@/components/background-logo';
import Footer from '@/components/footer';
import Placeholder from '@/components/placeholder';
import PlayingField from '@/components/playing-field';
import socketInit from '@/utils/socket-init';

type Props = {
  modeSlug: string;
};

export default function ABMode3(props: Props) {
  const { modeSlug } = props;
  const socket = socketInit();
  const [playerCards, setPlayerCards] = useState<ABCards>([]);
  const mode = ABMode.getMode(modeSlug)!;
  const game = new ABGame(mode);

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

        <PlayingField mode={mode} playerCards={playerCards} />

        <div className="mt-32">
          <Footer />
        </div>
      </motion.div>

      <AudioControlsDynamic />
    </>
  );
}
