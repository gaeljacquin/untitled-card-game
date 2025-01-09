'use client';

import { useEffect, useState } from 'react';
import { ABCards } from '@annabelle/shared/core/card';
import { motion } from 'framer-motion';
import AudioControlsDynamic from '@/components/audio-controls-dynamic';
import BackgroundLogo from '@/components/background-logo';
import Footer from '@/components/footer';
import Placeholder from '@/components/placeholder';
import PlayingField from '@/components/playing-field';
import { cn } from '@/lib/utils';
import socketInit from '@/utils/socket-init';

type Props = {
  modeSlug: string;
};

export default function ABMode1(props: Props) {
  const { modeSlug } = props;
  const socket = socketInit();
  const [abCards, setABCards] = useState<ABCards>([]);
  const howToPlayText = () => {
    return (
      <ul className="list-disc list-inside space-y-5 text-white text-sm text-start">
        <li>5 cards are dealt at the start of the game</li>
        <li>Drag any 4 cards from your hand to an available cell in the grid</li>
        <li>Make a poker hand on any row and column in the grid</li>
        <li>Click 'Next Round'</li>
        <li>The remaining card is moved to the discard pile, and a new set of 5 cards are dealt</li>
        <li>Rinse and repeat until the grid is filled</li>
        <li>The discard pile is activated when you score 3+ poker hands in the grid</li>
        <li>For an extra challenge, try to make a poker hand using the corners of the grid!</li>
        <li>Bonus points when poker hands also form valid words!</li>
      </ul>
    );
  };
  const gridClass = cn(
    // 'grid grid-cols-5 auto-rows-fr',
    'grid grid-cols-5 sm:grid-cols-[auto,repeat(4,1fr)]',
    'w-full aspect-square',
    'items-center justify-items-center'
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
      const { abCards } = data;
      setABCards(abCards);
      console.log(abCards);
    });

    return () => {
      socket.off('connect');
      socket.off(`game-init-res`);
      socket.off(`game-next-round-res`);
    };
  };

  // const temp = async (cardToDiscard, grid) => {
  //   const response = await socket.emitWithAck('game-next-round', {
  //     discardedABCard: cardToDiscard,
  //     currentABGrid: grid,
  //   });
  //   const abCards: ABCards = response.abCards;
  //   setABCards(abCards);
  //   return abCards;
  // };

  useEffect(() => {
    socket.emit('game-init', { modeSlug });
    wsConnect();
  }, []);

  useEffect(() => {}, [abCards]);

  if (!(abCards.length > 0)) {
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

        <PlayingField
          modeSlug={modeSlug}
          abCards={abCards}
          gridClass={gridClass}
          howToPlayText={howToPlayText}
          // temp={temp}
        />

        <div className="mt-32">
          <Footer />
        </div>
      </motion.div>

      <AudioControlsDynamic />
    </>
  );
}
