'use client';

import { useEffect, useState } from 'react';
import { ABCards } from '@untitled-card-game/shared/core/card';
import { motion } from 'framer-motion';
import AudioControlsDynamic from 'components/audio-controls-dynamic';
import BackgroundLogo from 'components/background-logo';
import Footer from 'components/footer';
import PlayingField from 'components/playing-field';
import { Button } from 'components/ui/button';
import { cn } from 'lib/utils';
import socketInit from 'utils/socket-init';

type Props = {
  modeSlug: string;
  gridClass: string;
};

export default function ABMode(props: Props) {
  const { modeSlug, gridClass } = props;
  const socket = socketInit();
  const [abCards, setABCards] = useState<ABCards>([]);
  const [abGameOver, setABGameOver] = useState<boolean>(false);
  const playerHandClass = cn(
    'flex flex-row flex-wrap sm:flex-col gap-2 sm:gap-4 items-center justify-center'
  );

  const wsConnect = () => {
    socket.on('connect', () => {
      console.info('Connected to server');
    });

    socket.on('game-init-res', (data) => {
      const { abCards } = data;
      setABCards(abCards);
    });

    socket.on('game-next-round-res', (data) => {
      const { abCards, gameOver } = data;

      if (gameOver) {
        setABGameOver(true);
      } else {
        setABCards(abCards);
      }
    });

    return () => {
      socket.off('connect');
      socket.off(`game-init-res`);
      socket.off(`game-next-round-res`);
    };
  };

  const initGame = (modeSlug: string) => {
    socket.emit('game-init', { modeSlug });
  };

  const handleNextRound = (data: { [key: string]: unknown }) => {
    socket.emit('game-next-round', data);
  };

  useEffect(() => {
    initGame(modeSlug);
    wsConnect();
  }, []);

  return (
    <>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="header-text-ab"
      >
        <BackgroundLogo />

        <PlayingField
          modeSlug={modeSlug}
          abCards={abCards}
          gridClass={gridClass}
          playerHandClass={playerHandClass}
          handleNextRound={handleNextRound}
          gameOver={abGameOver}
          initGame={initGame}
          setABGameOver={setABGameOver}
        />

        <div className="flex flex-col items-center justify-center gap-4 footer-spacing-ab">
          {process.env.NODE_ENV === 'development' && (
            <Button variant="destructive" onClick={() => setABGameOver(true)}>
              Simulate Game Over
            </Button>
          )}

          <Footer />
        </div>
      </motion.div>

      <AudioControlsDynamic />
    </>
  );
}
