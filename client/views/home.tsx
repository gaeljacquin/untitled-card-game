'use client';

import { motion } from 'framer-motion';
import AnimatedLogoDynamic from '@/components/animated-logo-dynamic';
import AudioControlsDynamic from '@/components/audio-controls-dynamic';
import MainMenuButtons from '@/components/main-menu-buttons';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { PageTransition } from '@/components/ui/page-transition';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <PageTransition>
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgba(4, 61, 34, 0.77)"
        gradientBackgroundEnd="rgb(13, 20, 49)"
      >
        <div className="min-h-screen flex flex-col items-center justify-center p-4 absolute z-50 inset-0 -mt-32">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div
              className={cn(
                'rounded-2xl mb-4 mx-auto flex items-center justify-center',
                'w-[20rem] h-2 sm:w-[24rem] sm:h-5 md:w-[40rem] md:h-16 lg:w-[56rem] lg:h-32',
                'bg-transparent'
              )}
            >
              <AnimatedLogoDynamic loop autoplay />
            </div>
          </motion.div>

          <div className="flex container items-center justify-center mx-auto -mt-7">
            <MainMenuButtons />
          </div>

          <div className="container max-w-4xl mx-auto -mt-16">
            <AudioControlsDynamic />
          </div>
        </div>
      </BackgroundGradientAnimation>
    </PageTransition>
  );
}
