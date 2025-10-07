'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/ui/page-transition';
import { isMaintenanceMode } from '@/utils/maintenance-mode';

export default function Home() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-8">
          <motion.h1
            className="text-6xl md:text-8xl font-black text-foreground mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Untitled Card Game
          </motion.h1>

          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ArrowRight className="w-12 h-12 text-foreground" />
            <Button
              variant="accent"
              size="lg"
              onClick={() => navigate('/game')}
              disabled={isMaintenanceMode}
              className="text-5xl font-black px-12 py-8 h-auto"
            >
              New Game
            </Button>
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <ArrowRight className="w-12 h-12 text-foreground" />
            <Button
              variant="muted"
              size="lg"
              onClick={() => navigate('/how-to-play')}
              className="text-5xl font-black px-12 py-8 h-auto"
            >
              How to Play
            </Button>
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <ArrowRight className="w-12 h-12 text-foreground" />
            <Button
              variant="muted"
              size="lg"
              onClick={() => navigate('/settings')}
              className="text-5xl font-black px-12 py-8 h-auto"
            >
              Settings
            </Button>
          </motion.div>

          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <ArrowRight className="w-12 h-12 text-foreground" />
            <Button
              variant="muted"
              size="lg"
              onClick={() => navigate('/credits')}
              className="text-5xl font-black px-12 py-8 h-auto"
            >
              Credits
            </Button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}
