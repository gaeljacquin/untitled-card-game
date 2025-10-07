'use client';

import { useState } from 'react';
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/ui/page-transition';
import appinfo from '@/utils/appinfo';
import { isMaintenanceMode } from '@/utils/maintenance-mode';

export default function Home() {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const bounceAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="space-y-8">
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img src="/logo.png" alt={appinfo.title} width={400} height={400} className="mx-auto" />
          </motion.div>

          <motion.div
            className="flex items-center gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onMouseEnter={() => setHoveredButton('new-game')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <motion.div animate={hoveredButton === 'new-game' ? bounceAnimation : {}}>
              <ArrowRight className="size-12 text-foreground" />
            </motion.div>
            <Button
              size="lg"
              onClick={() => navigate('/game')}
              disabled={isMaintenanceMode}
              className="text-5xl font-black px-12 py-8 h-auto bg-red-500 hover:bg-red-600 text-white cursor-pointer"
            >
              New Game
            </Button>
          </motion.div>

          <motion.div
            className="flex items-center gap-4 mt-8 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            onMouseEnter={() => setHoveredButton('how-to-play')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <motion.div animate={hoveredButton === 'how-to-play' ? bounceAnimation : {}}>
              <ArrowUpRight className="size-12 text-foreground" />
            </motion.div>
            <Button
              size="lg"
              onClick={() => navigate('/how-to-play')}
              className="text-5xl font-black px-12 py-8 h-auto bg-yellow-500 hover:bg-yellow-600  text-white cursor-pointer"
            >
              How to Play
            </Button>
          </motion.div>

          <motion.div
            className="flex items-center gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            onMouseEnter={() => setHoveredButton('settings')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <motion.div animate={hoveredButton === 'settings' ? bounceAnimation : {}}>
              <ArrowDownRight className="size-12 text-foreground" />
            </motion.div>
            <Button
              size="lg"
              onClick={() => navigate('/settings')}
              className="text-5xl font-black px-12 py-8 h-auto bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
            >
              Settings
            </Button>
          </motion.div>

          <motion.div
            className="flex items-center gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            onMouseEnter={() => setHoveredButton('credits')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <motion.div animate={hoveredButton === 'credits' ? bounceAnimation : {}}>
              <ArrowDown className="size-12 text-foreground" />
            </motion.div>
            <Button
              size="lg"
              onClick={() => navigate('/credits')}
              className="text-5xl font-black px-12 py-8 h-auto bg-black hover:bg-black/80 text-white cursor-pointer"
            >
              Credits
            </Button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
