'use client';

// import { ABCard } from '@annabelle/shared/core/card';
// import { Rank } from '@annabelle/shared/core/rank';
// import { Suit } from '@annabelle/shared/core/suit';
import { EmblaOptionsType } from 'embla-carousel';
import { motion } from 'framer-motion';
import AnimatedLogoDynamic from '@/components/animated-logo-dynamic';
import AudioControlsDynamic from '@/components/audio-controls-dynamic';
import EmblaCarousel from '@/components/carousel';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { PageTransition } from '@/components/ui/page-transition';
import { cn } from '@/lib/utils';

import '@/styles/base.css';
import '@/styles/sandbox.css';
import '@/styles/embla.css';

type CarouselItem = {
  id: number;
  title: string;
  description: string;
  slug: string;
};

// const mode1Card = new ABCard(
//   Rank.getById('four'),
//   Suit.getById('diamonds'),
//   false,
//   'any',
//   true,
//   true,
//   'p'
// );
// const mode2Card = new ABCard(
//   Rank.getById('five'),
//   Suit.getById('hearts'),
//   false,
//   'any',
//   true,
//   true,
//   'p'
// );
// const mode3Card = new ABCard(
//   Rank.getById('five'),
//   Suit.getById('spades'),
//   false,
//   'any',
//   true,
//   true,
//   'w'
// );
// const settingsCard = new ABCard(
//   Rank.getById('nine'),
//   Suit.getById('clubs'),
//   false,
//   'any',
//   true,
//   true,
//   's'
// );
// const creditsCard = new ABCard(
//   Rank.getById('ace'),
//   Suit.getById('spades'),
//   false,
//   'any',
//   true,
//   true,
//   'c'
// );

const carouselItems: CarouselItem[] = [
  {
    id: 1,
    // id: 0,
    title: 'New Game v1',
    description: 'Fill the 4 x 4 grid with the best poker hands!',
    slug: 'game/mode-1',
  },
  {
    id: 2,
    // id: 1,
    title: 'New Game v2',
    description: 'Fill the 5 x 5 grid with the best poker hands!',
    slug: 'game/mode-2',
  },
  {
    id: 3,
    // id: 2,
    title: 'New Game v3',
    description: 'Fill the 5 x 5 grid with the highest scoring words!',
    slug: 'game/mode-3',
  },
  {
    id: 4,
    // id: 3,
    title: 'Settings',
    description: 'Customization options',
    slug: 'settings',
  },
  {
    id: 5,
    // id: 4,
    title: 'Credits',
    description: 'Behind the game',
    slug: 'credits',
  },
];
const OPTIONS: EmblaOptionsType = { loop: true };

export default function Home() {
  return (
    <PageTransition>
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgba(4, 61, 34, 0.77)"
        gradientBackgroundEnd="rgb(13, 20, 49)"
        // gradientBackgroundStart="rgba(0,0,0,0)"
        // gradientBackgroundEnd="rgb(5, 43, 28)"
        // firstColor="10, 60, 150"
        // secondColor="150, 40, 150"
        // thirdColor="50, 120, 150"
        // fourthColor="120, 30, 30"
        // fifthColor="100, 100, 30"
        // blendingValue="screen"
      >
        <div className="min-h-screen flex flex-col items-center justify-center p-4 absolute z-50 inset-0">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div
              className={cn(
                'rounded-2xl mb-4 mx-auto flex items-center justify-center',
                'w-[20rem] h-2 sm:w-[24rem] sm:h-5 md:w-[56rem] md:h-16 lg:w-[64rem] lg:h-32',
                'bg-transparent'
              )}
            >
              <AnimatedLogoDynamic logo={'game'} loop autoplay />
            </div>
          </motion.div>

          <div className="relative">
            <EmblaCarousel slides={carouselItems} options={OPTIONS} />
          </div>

          <div className="container max-w-4xl mx-auto -mt-16">
            <AudioControlsDynamic />
          </div>
        </div>
      </BackgroundGradientAnimation>
    </PageTransition>
  );
}
