'use client';

import { useState } from 'react';
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useAnimation } from 'motion/react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/ui/page-transition';
import appinfo from '@/utils/appinfo';
import { isMaintenanceMode } from '@/utils/maintenance-mode';

export default function Home() {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const logoControls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);

  const rightBounceAnimation = {
    x: [0, 10, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  };

  const upRightBounceAnimation = {
    x: [0, 10, 0],
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  };

  const downRightBounceAnimation = {
    x: [0, 10, 0],
    y: [0, 10, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  };

  const downBounceAnimation = {
    y: [0, 10, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  };

  const handleLogoClick = async () => {
    // Only trigger spin if not dragging
    if (!isDragging) {
      await logoControls.start({
        rotate: 360 * 5, // 5 full rotations
        transition: {
          duration: 2.5,
          ease: [0.22, 1, 0.36, 1], // Custom ease-out curve for gradual deceleration
        },
      });
      // Reset rotation to 0 for next click
      logoControls.set({ rotate: 0 });
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-background overflow-hidden">
        <div className="space-y-8">
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.img
              src="/logo.webp"
              alt={appinfo.title}
              width={400}
              height={400}
              className="mx-auto cursor-grab active:cursor-grabbing"
              animate={logoControls}
              drag
              dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
              dragElastic={1}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={() => {
                setIsDragging(false);
              }}
              onClick={handleLogoClick}
              whileTap={{ scale: 1.05 }}
              style={{ transformOrigin: 'center' }}
            />
          </motion.div>

          <motion.div
            className="flex items-center gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onMouseEnter={() => setHoveredButton('new-game')}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <motion.div
              animate={hoveredButton === 'new-game' ? { ...rightBounceAnimation } : undefined}
            >
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
            <motion.div
              animate={
                hoveredButton === 'how-to-play' ? { ...downRightBounceAnimation } : undefined
              }
            >
              <ArrowDownRight className="size-12 text-foreground" />
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
            <motion.div
              animate={hoveredButton === 'settings' ? { ...upRightBounceAnimation } : undefined}
            >
              <ArrowUpRight className="size-12 text-foreground" />
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
            <motion.div
              animate={hoveredButton === 'credits' ? { ...downBounceAnimation } : undefined}
            >
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
