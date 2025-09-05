'use client';

import { useCallback, useEffect, useState } from 'react';
import { ABCards, SlugId } from '@gaeljacquin/ucg-shared';
import BackgroundLogo from '@/components/background-logo';
import Footer from '@/components/footer';
import PlayingField from '@/components/playing-field';
import ReturnMainMenu from '@/components/return-main-menu';
import { Button } from '@/components/ui/button';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import SocketInit from '@/utils/socket-init';

export default function ABMode({ modeSlug, gridClass }: { modeSlug: SlugId; gridClass: string }) {
  const socket = SocketInit();
  const [abCards, setABCards] = useState<ABCards>([]);
  const [abGameOver, setABGameOver] = useState<boolean>(false);
  const playerHandClass = cn(
    'flex flex-row flex-wrap sm:flex-col gap-2 sm:gap-4 items-center justify-center'
  );

  const wsConnect = useCallback(() => {
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
  }, [socket]);

  const initGame = useCallback(
    (modeSlug: string) => {
      socket.emit('game-init', { modeSlug });
    },
    [socket]
  );

  const handleNextRound = (data: { [key: string]: unknown }) => {
    socket.emit('game-next-round', data);
  };

  useEffect(() => {
    initGame(modeSlug);
    wsConnect();
  }, [initGame, modeSlug, wsConnect]);

  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgba(61, 34, 4, 0.77)"
      gradientBackgroundEnd="rgb(49, 13, 20)"
    >
      <div className="absolute z-50 inset-0 flex flex-col">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="header-text-ab flex-1 overflow-auto p-4"
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
          {import.meta.env.DEV && (
            <Button
              variant="destructive"
              onClick={() => setABGameOver(true)}
              className="hover:cursor-pointer"
            >
              Simulate Game Over
            </Button>
          )}
          
          <div className="flex justify-center my-8">
            <ReturnMainMenu />
          </div>

          <Footer />
        </div>
        </motion.div>
      </div>
    </BackgroundGradientAnimation>
  );
}
