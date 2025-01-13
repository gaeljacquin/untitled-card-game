'use client';

import { useEffect, useState } from 'react';
import { ABCards } from '@annabelle/shared/core/card';
import {
  evaluateColumnHand,
  evaluateRowHand,
  evaluateSpecialHand,
} from '@annabelle/shared/functions/checkers';
import { motion } from 'framer-motion';
// import { Clock, Star, Target, Trophy, Zap } from 'lucide-react';
import AudioControlsDynamic from '@/components/audio-controls-dynamic';
import BackgroundLogo from '@/components/background-logo';
import Footer from '@/components/footer';
import PlayingField from '@/components/playing-field';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import socketInit from '@/utils/socket-init';

type Props = {
  modeSlug: string;
  gridClass: string;
};

export default function ABMode(props: Props) {
  const { modeSlug, gridClass } = props;
  const socket = socketInit();
  const [abCards, setABCards] = useState<ABCards>([]);
  const [abGameOver, setABGameOver] = useState<boolean>(false);
  const [abResult, setABResult] = useState<{
    [key: string]: {
      word: string;
      match: string;
      points_final: number;
    };
  } | null>(null);
  const playerHandClass = cn('grid grid-rows-1 sm:grid-cols-1 gap-2 md:gap-4 justify-items-center');

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
        setABResult(abResult);
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

  useEffect(() => {
    initGame(modeSlug);
    wsConnect();
  }, []);

  const initGame = (modeSlug: string) => {
    socket.emit('game-init', { modeSlug });
  };

  const handleNextRound = (data: { [key: string]: unknown }) => {
    socket.emit('game-next-round', data);
  };

  return (
    <>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="header-text-uwu"
      >
        <BackgroundLogo />

        <PlayingField
          modeSlug={modeSlug}
          abCards={abCards}
          gridClass={gridClass}
          playerHandClass={playerHandClass}
          handleNextRound={handleNextRound}
          evaluateColumn={evaluateColumnHand}
          evaluateRow={evaluateRowHand}
          evaluateSpecial={evaluateSpecialHand}
          gameOver={abGameOver}
          abResult={abResult}
          initGame={initGame}
          setABGameOver={setABGameOver}
        />

        <div className="flex flex-col items-center justify-center gap-4 footer-spacing-uwu">
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
