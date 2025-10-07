'use client';

import { ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/ui/page-transition';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useUcgStore } from '@/stores/ucg-store';

export default function GameModeSelect() {
  const navigate = useNavigate();
  const { getSettings, updateSettings } = useUcgStore();
  const settings = getSettings();
  const jokersEnabled = settings.jokers;

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

  const toggleJokers = () => {
    updateSettings({
      ...settings,
      jokers: !jokersEnabled,
    });
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
            className="self-start p-0 hover:bg-transparent cursor-pointer"
          >
            <ArrowUp className="size-20 text-foreground text-red" />
            <p>Return to Main Menu</p>
          </Button>
        </motion.div>

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-6 max-w-2xl">
            <div className="space-y-4">
              <motion.div custom={0} initial="hidden" animate="visible" variants={buttonVariants}>
                <Button
                  size="lg"
                  onClick={() => navigate('/game/four')}
                  className="w-full text-5xl font-black px-16 py-8 h-auto bg-yellow-500 hover:bg-yellow-600 text-white cursor-pointer"
                >
                  Four (4×4)
                </Button>
              </motion.div>

              <motion.div custom={1} initial="hidden" animate="visible" variants={buttonVariants}>
                <Button
                  size="lg"
                  onClick={() => navigate('/game/five')}
                  className="w-full text-5xl font-black px-16 py-8 h-auto bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                >
                  Five (5×5)
                </Button>
              </motion.div>
            </div>

            <motion.p
              className="text-2xl text-foreground mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <Separator />
            </motion.p>

            <motion.div
              className="mt-6"
              custom={2}
              initial="hidden"
              animate="visible"
              variants={buttonVariants}
            >
              <Button
                onClick={toggleJokers}
                className={`w-3/4 text-3xl font-black px-12 py-6 h-auto text-white cursor-pointer ${
                  jokersEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {jokersEnabled ? 'Jokers ON*' : 'Jokers OFF'}
              </Button>
              <p
                className={cn(
                  'text-sm font-bold text-foreground mt-1',
                  !jokersEnabled && 'invisible'
                )}
              >
                *5x5 grid only
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
