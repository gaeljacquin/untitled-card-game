'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimatedLogoDynamic from '@/components/animated-logo-dynamic';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import InteractiveHoverButton from '@/components/ui/interactive-hover-button';
import { PageTransition } from '@/components/ui/page-transition';
import appinfo from '@/utils/appinfo';

export default function Home() {
  const menuItems = [
    {
      label: 'New Game',
      route: '/game',
      gradient: 'bg-gradient-to-r from-cyan-600 to-emerald-900',
    },
    {
      label: 'How to Play',
      route: '/how-to-play',
      gradient: 'bg-gradient-to-r from-yellow-700 to-rose-700',
    },
    {
      label: 'Settings',
      route: '/settings',
      gradient: 'bg-gradient-to-r from-purple-700 to-pink-700',
    },
    {
      label: 'About',
      route: '/about',
      gradient: 'bg-gradient-to-r from-blue-700 to-fuchsia-700',
    },
  ];

  return (
    <BackgroundGradientAnimation
      gradientBackgroundStart="rgba(4, 61, 34, 0.77)"
      gradientBackgroundEnd="rgb(13, 20, 49)"
    >
      <PageTransition>
        <div className="min-h-screen flex flex-col items-center justify-center p-4 absolute z-50 inset-0">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="w-32 h-32 bg-primary rounded-2xl mb-4 mx-auto flex items-center justify-center mb-7">
              <AnimatedLogoDynamic logo={'game'} loop={false} />
            </div>
            <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-green-200">
              {appinfo.description}
            </h3>
          </motion.div>

          <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={item.route}>
                  <InteractiveHoverButton
                    text={item.label}
                    className="w-full h-16 text-lg border-0"
                    gradient={item.gradient}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center justify-center mt-4 sm:hidden">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h3 className="text-md font-semibold text-center">
                <p>
                  A larger display area is required to play{' '}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                    {appinfo.title}
                  </span>
                  .
                </p>
                <p>Please expand your browser window or try another device.</p>
              </h3>
            </motion.div>
          </div>
        </div>
      </PageTransition>
    </BackgroundGradientAnimation>
  );
}
