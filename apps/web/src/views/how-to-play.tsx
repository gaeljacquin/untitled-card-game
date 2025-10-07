'use client';

import { ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

import Footer from '@/components/footer';
import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/ui/page-transition';

export default function HowToPlay() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col bg-background p-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Button
            variant="ghost"
            size="lg"
            onClick={() => navigate('/')}
            className="self-start p-0 hover:bg-transparent"
          >
            <ArrowUp className="w-16 h-16 text-foreground" />
          </Button>
        </motion.div>

        <div className="flex-1 flex items-center justify-center overflow-auto">
          <motion.div
            className="max-w-4xl mx-auto space-y-8 py-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-black text-foreground text-center mb-12">
              How to Play
            </h1>

            <div className="space-y-8 text-foreground">
              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Basic Gameplay</h2>
                <ul className="list-decimal list-inside space-y-3 text-base md:text-lg">
                  <li>
                    <strong>Place Cards</strong>
                    <ul className="list-disc list-inside space-y-2 ml-7 mt-2">
                      <li>Drag cards from your hand onto any empty cell in the grid.</li>
                      <li>
                        Position your cards strategically to create poker hands in rows and columns.
                        <ul className="list-disc list-inside space-y-2 ml-7 mt-2">
                          <li>Card order doesn&apos;t matter—only the combination counts.</li>
                          <li>See poker hand rankings below for reference.</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Discard & Draw</strong>
                    <ul className="list-disc list-inside space-y-2 ml-7 mt-2">
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
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold">Bonus Scoring</h2>
                <ul className="list-[square] list-inside space-y-3 text-base md:text-lg">
                  <li>
                    Earn bonus points by creating poker hands with special cards:
                    <ul className="list-disc list-inside space-y-2 ml-7 mt-2">
                      <li>
                        <strong>Discard Bonus:</strong> Use cards from your discard pile.
                      </li>
                      <li>
                        <strong>Special Bonus:</strong> Use the four corner cards (plus the center
                        card in <em>5×5</em> mode).
                      </li>
                      <li>These special cells are marked with an animated beam effect.</li>
                    </ul>
                  </li>
                  <li>
                    To unlock bonuses, you must first complete a minimum number of valid poker
                    hands (One Pair or better) in your grid.
                    <ul className="list-disc list-inside space-y-2 ml-7 mt-2">
                      <li>
                        The required threshold changes based on the bonus type and which mode
                        you&apos;re playing.
                      </li>
                    </ul>
                  </li>
                  <li>Challenge yourself to unlock both bonuses in a single game!</li>
                </ul>
              </section>
            </div>

            <div className="flex justify-center pt-8">
              <Footer />
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
