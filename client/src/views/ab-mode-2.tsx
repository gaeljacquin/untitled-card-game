'use client';

import { useEffect, useState } from 'react';
import { ABCards } from '@annabelle/shared/core/card';
import {
  evaluateColumnHand,
  evaluateRowHand,
  evaluateSpecialHand,
} from '@annabelle/shared/functions/checkers';
import { motion } from 'framer-motion';
import AudioControlsDynamic from '@/components/audio-controls-dynamic';
import BackgroundLogo from '@/components/background-logo';
import Footer from '@/components/footer';
import Placeholder from '@/components/placeholder';
import PlayingField from '@/components/playing-field';
// import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import socketInit from '@/utils/socket-init';

type Props = {
  modeSlug: string;
};

export default function ABMode2(props: Props) {
  const { modeSlug } = props;
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
  const howToPlayText = () => {
    return (
      <ul className="list-disc list-inside space-y-5 text-white text-sm text-start">
        <li>6 cards are dealt at the start of the game</li>
        <li>Drag any 5 cards from your hand to an available cell in the grid</li>
        <li>Make a poker hand on any row and column in the grid</li>
        <li>Click 'Confirm'</li>
        <li>The remaining card is moved to the discard pile, and a new set of 6 cards are dealt</li>
        <li>Rinse and repeat until the grid is filled</li>
        <li>
          For an extra challenge, try to make a poker hand using the center and corners of the grid!
        </li>
        <li>Bonus points when poker hands also form valid words!</li>
      </ul>
    );
  };
  const gridClass = cn('grid grid-cols-5 gap-2 md:gap-4 bg-amber-950/30 rounded-2xl p-2 md:p-4');
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
      const { abCards, gameOver, abResult } = data;

      if (gameOver && abResult) {
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
    socket.emit('game-init', { modeSlug });
    wsConnect();
  }, []);

  const handleNextRound = (data: { [key: string]: unknown }) => {
    socket.emit('game-next-round', data);
  };

  if ((!abCards || abCards.length === 0) && !abGameOver) {
    return <Placeholder />;
  }

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
          howToPlayText={howToPlayText}
          handleNextRound={handleNextRound}
          evaluateColumn={evaluateColumnHand}
          evaluateRow={evaluateRowHand}
          evaluateSpecial={evaluateSpecialHand}
          gameOver={abGameOver}
          abResult={abResult}
        />

        <div className="footer-spacing-uwu">
          {/* <Button variant="destructive" onClick={() => setABGameOver(true)}>
            Simulate Game Over
          </Button> */}

          <Footer />
        </div>
      </motion.div>

      <AudioControlsDynamic />
    </>
  );
}
