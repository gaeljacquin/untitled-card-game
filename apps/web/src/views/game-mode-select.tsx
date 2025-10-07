'use client';

import { ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/ui/page-transition';

export default function GameModeSelect() {
  const navigate = useNavigate();

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.4,
      },
    }),
  };

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

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-6 max-w-2xl">
            <div className="space-y-4">
              <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={buttonVariants}
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/game/four')}
                  className="w-full text-5xl font-black px-16 py-8 h-auto"
                >
                  Four (5×5)
                </Button>
              </motion.div>

              <motion.div
                custom={1}
                initial="hidden"
                animate="visible"
                variants={buttonVariants}
              >
                <Button
                  variant="muted"
                  size="lg"
                  onClick={() => navigate('/game/five')}
                  className="w-full text-5xl font-black px-16 py-8 h-auto"
                >
                  Five (6×6)
                </Button>
              </motion.div>
            </div>

            <motion.p
              className="text-2xl text-foreground mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              Choose your grid size
            </motion.p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
