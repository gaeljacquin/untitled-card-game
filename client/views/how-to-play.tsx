'use client';

import AudioControlsDynamic from 'components/audio-controls-dynamic';
import BackgroundLogo from 'components/background-logo';
import Footer from 'components/footer';
import SectionCard from 'components/section-card';
import { motion } from 'framer-motion';

export default function HowToPlay() {
  return (
    <>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <BackgroundLogo />

        <div className="max-w-4xl mx-auto space-y-8 mt-16 mb-16 relative z-10">
          <SectionCard
            title="How to Play"
            className="flex flex-col text-center text-white space-y-4 bg-amber-950/30 rounded-2xl p-4"
          >
            <h1 className="text-lg font-bold mb-4 -mt-4">Gameplay</h1>
            <ul className="list-decimal list-inside space-y-5 text-white text-sm sm:text-md text-start">
              <li>
                Build
                <ul className="list-disc list-inside space-y-2 text-white text-sm sm:text-md text-start ml-7 mt-2">
                  <li>Drag cards from your hand to an available cell in the grid.</li>
                  <li>
                    Arrange cards to form poker hands.
                    <ul className="list-disc list-inside space-y-2 text-white text-sm sm:text-md text-start ml-7 mt-2">
                      <li>The order of cards within a hand doesn&apos;t matter.</li>
                      <li>Scroll down to view examples of poker hands.</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                Discard
                <ul className="list-disc list-inside space-y-2 text-white text-sm sm:text-md text-start ml-7 mt-2">
                  <li>
                    Once you&apos;re satisfied with your hand placements, click &quot;Discard&quot;.
                  </li>
                  <li>The remaining card in your hand is moved to the discard pile.</li>
                  <li>A new set of cards is dealt to your hand.</li>
                  <li>Cards from previous deals cannot be moved.</li>
                </ul>
              </li>
              <li>Repeat steps 1 & 2 until the entire grid is filled.</li>
            </ul>

            <h2 className="text-lg font-bold mt-7 mb-4">Extra</h2>
            <ul className="list-[square] list-inside space-y-5 text-white text-sm sm:text-md text-start">
              <li>
                You may earn additional points by forming poker hands using:
                <ul className="list-disc list-inside space-y-2 text-white text-sm sm:text-md text-start ml-7 mt-2">
                  <li>Cards from the discard pile &rarr; Discard Bonus.</li>
                  <li>
                    Cards in the corners of the grid (plus the center of the grid in <em>5x5</em>{' '}
                    mode) &rarr; Special Bonus.
                  </li>
                  <li>The aforementioned grid cells are highlighted with an animated beam.</li>
                </ul>
              </li>
              <li>
                You must first score a certain number of poker hands (&quot;One Pair&quot; or
                better) within the grid.
                <ul className="list-disc list-inside space-y-2 text-white text-sm sm:text-md text-start ml-7 mt-2">
                  <li>
                    The required number of poker hands varies depending on the bonus type and game
                    mode.
                  </li>
                </ul>
              </li>
              <li>Try to get both bonuses in one game for an even greater challenge!</li>
            </ul>
          </SectionCard>
        </div>
        <Footer />
      </motion.div>

      <AudioControlsDynamic />
    </>
  );
}
