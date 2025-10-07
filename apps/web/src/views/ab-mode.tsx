'use client';

import { useCallback, useEffect, useState } from 'react';
import { ABCards, SlugId } from '@untitled-card-game/shared';
import { ArrowLeft, ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

import Footer from '@/components/footer';
import PlayingField from '@/components/playing-field';
import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/ui/page-transition';
import { cn } from '@/lib/utils';
import { useUcgStore } from '@/stores/ucg-store';
import { reconstructCards } from '@/utils/card-helpers';
import SocketInit from '@/utils/socket-init';

export default function ABMode({ modeSlug, gridClass }: { modeSlug: SlugId; gridClass: string }) {
  const navigate = useNavigate();
  const socket = SocketInit();
  const { jokers } = useUcgStore();
  const [abCards, setABCards] = useState<ABCards>([]);
  const [abGameOver, setABGameOver] = useState<boolean>(false);
  const playerHandClass = cn(
    'flex flex-row flex-wrap md:flex-col gap-2 md:gap-4 items-center justify-center'
  );

  const wsConnect = useCallback(() => {
    socket.on('connect', () => {
      console.info('Connected to server');
    });

    socket.on('game-init-res', (data) => {
      const { abCards } = data;

      if (!abCards || !Array.isArray(abCards)) {
        return;
      }

      try {
        // Reconstruct cards from plain objects to ABCard instances
        const reconstructedCards = reconstructCards(abCards);
        setABCards(reconstructedCards);
      } catch (error) {
        console.error('Error reconstructing cards:', error);
      }
    });

    socket.on('game-next-round-res', (data) => {
      const { abCards, gameOver } = data;

      if (gameOver) {
        setABGameOver(true);
      } else {
        if (!abCards || !Array.isArray(abCards)) {
          return;
        }

        try {
          // Reconstruct cards from plain objects to ABCard instances
          const reconstructedCards = reconstructCards(abCards);
          setABCards(reconstructedCards);
        } catch (error) {
          console.error('Error reconstructing cards:', error);
        }
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
      socket.emit('game-init', { modeSlug, jokers });
    },
    [socket, jokers]
  );

  const handleNextRound = (data: { [key: string]: unknown }) => {
    socket.emit('game-next-round', data);
  };

  useEffect(() => {
    initGame(modeSlug);
    wsConnect();
  }, [initGame, modeSlug, wsConnect]);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-background p-4 relative">
        {import.meta.env.DEV && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute top-4 right-4 z-50"
          >
            <Button
              variant="destructive"
              onClick={() => setABGameOver(true)}
              className="hover:cursor-pointer"
            >
              Simulate Game Over
            </Button>
          </motion.div>
        )}
        <div className="flex flex-col gap-4 mt-4 pl-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Button
              variant="ghost"
              size="lg"
              onClick={() => navigate('/')}
              className="self-start p-0 hover:bg-transparent cursor-pointer"
            >
              <ArrowUp className="size-20 text-foreground text-red" />
              <p>Exit to Main Menu</p>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Button
              variant="ghost"
              size="lg"
              onClick={() => navigate('/game')}
              className="self-start p-0 hover:bg-transparent cursor-pointer"
            >
              <ArrowLeft className="size-20 text-foreground text-red" />
              <p>Return to Mode Selection</p>
            </Button>
          </motion.div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center overflow-auto">
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

          <div className="flex flex-col items-center justify-center gap-4 mt-8">
            <Footer />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
