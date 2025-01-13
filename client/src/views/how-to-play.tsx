'use client';

import { motion } from 'framer-motion';
import AudioControlsDynamic from '@/components/audio-controls-dynamic';
import BackgroundLogo from '@/components/background-logo';
import Footer from '@/components/footer';
import SectionCard from '@/components/section-card';

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
          <SectionCard title="How to Play" className="flex flex-col text-center text-white p-4">
            <div className="space-y-4 text-white bg-amber-950/30 rounded-lg p-6">
              <ul className="list-disc list-inside space-y-5 text-white text-md text-start">
                <li>
                  Drag cards from the player hand to any available cell in the grid until 1 card
                  remains
                </li>
                <li>Build poker hands in the grid; the order of cards does not matter!</li>
                <li>Once you are satisfied with your placements, click 'Discard'</li>
                <li>
                  The remaining card is moved from the player hand to the discard pile, and a new
                  set of cards is dealt
                </li>
                <li>Rinse and repeat until the grid is filled</li>
                <li>
                  You may earn bonus points from building poker hands using the discard pile and/or
                  the corners (and center) of the grid!
                </li>
                <li>
                  Activating the bonuses require at least certain amount of poker hands. The amounts
                  vary by game mode, and only 'One Pair' and above count. Try scoring them for an
                  extra challenge!
                </li>
              </ul>
            </div>
          </SectionCard>
        </div>
        <Footer />
      </motion.div>
      <AudioControlsDynamic />
    </>
  );
}
