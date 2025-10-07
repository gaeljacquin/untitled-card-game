'use client';

import { motion } from 'motion/react';

import BackgroundLogo from '@/components/background-logo';
import Footer from '@/components/footer';
import ReturnMainMenu from '@/components/return-main-menu';
import SectionCard from '@/components/section-card';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';

export default function HowToPlay() {
  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgba(34, 4, 61, 0.77)"
      gradientBackgroundEnd="rgb(20, 13, 49)"
    >
      <div className="absolute z-50 inset-0 flex flex-col">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 flex-1 overflow-auto p-4"
        >
          <BackgroundLogo />

          <div className="max-w-4xl mx-auto space-y-8 mt-16 mb-16 relative z-10">
            <SectionCard
              title="How to Play"
              className="flex flex-col text-center text-white space-y-4 bg-amber-950/30 rounded-2xl p-4"
            >
              <h1 className="text-lg font-bold mb-4 -mt-4">Basic Gameplay</h1>
              <ul className="list-decimal list-inside space-y-5 text-white text-sm sm:text-md text-start">
                <li>
                  <strong>Place Cards</strong>
                  <ul className="list-disc list-inside space-y-2 text-white text-sm sm:text-md text-start ml-7 mt-2">
                    <li>Drag cards from your hand onto any empty cell in the grid.</li>
                    <li>
                      Position your cards strategically to create poker hands in rows and columns.
                      <ul className="list-disc list-inside space-y-2 text-white text-sm sm:text-md text-start ml-7 mt-2">
                        <li>Card order doesn&apos;t matter—only the combination counts.</li>
                        <li>See poker hand rankings below for reference.</li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Discard & Draw</strong>
                  <ul className="list-disc list-inside space-y-2 text-white text-sm sm:text-md text-start ml-7 mt-2">
                    <li>
                      When you&apos;re happy with your placements, click the &quot;Discard&quot;
                      button.
                    </li>
                    <li>Your leftover card goes to the discard pile.</li>
                    <li>You&apos;ll receive a fresh hand of cards.</li>
                    <li>Previously placed cards are locked and cannot be moved.</li>
                  </ul>
                </li>
                <li>Continue placing cards and discarding until every grid cell is full.</li>
              </ul>

              <h2 className="text-lg font-bold mt-7 mb-4">Bonus Scoring</h2>
              <ul className="list-[square] list-inside space-y-5 text-white text-sm sm:text-md text-start">
                <li>
                  Earn bonus points by creating poker hands with special cards:
                  <ul className="list-disc list-inside space-y-2 text-white text-sm sm:text-md text-start ml-7 mt-2">
                    <li>
                      <strong>Discard Bonus:</strong> Use cards from your discard pile.
                    </li>
                    <li>
                      <strong>Special Bonus:</strong> Use the four corner cards (plus the center
                      card in <em>5x5</em> mode).
                    </li>
                    <li>These special cells are marked with an animated beam effect.</li>
                  </ul>
                </li>
                <li>
                  To unlock bonuses, you must first complete a minimum number of valid poker hands
                  (One Pair or better) in your grid.
                  <ul className="list-disc list-inside space-y-2 text-white text-sm sm:text-md text-start ml-7 mt-2">
                    <li>
                      The required threshold changes based on the bonus type and which mode
                      you&apos;re playing.
                    </li>
                  </ul>
                </li>
                <li>Challenge yourself to unlock both bonuses in a single game!</li>
              </ul>
            </SectionCard>
          </div>
          <div className="flex justify-center my-8">
            <ReturnMainMenu />
          </div>
          <Footer />
        </motion.div>
      </div>
    </BackgroundGradientAnimation>
  );
}
