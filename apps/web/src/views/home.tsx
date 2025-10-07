'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { PageTransition } from '@/components/ui/page-transition';
import { isMaintenanceMode } from '@/utils/maintenance-mode';
import { useUcgStore } from '@/stores/ucg-store';
import AskRtfm from '@/components/ask-rtfm';
import ModeSelect from '@/components/mode-select';

export default function Home() {
  const navigate = useNavigate();
  const { askRtfm, muteAskRtfm } = useUcgStore();
  const [modeSelection, openModeSelection] = useState(false);
  const [askRtfmOpen, setAskRtfmOpen] = useState(false);

  const handleNewGameClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isMaintenanceMode) return;

    if (askRtfm) {
      e.preventDefault();
      setAskRtfmOpen(true);
    } else {
      e.preventDefault();
      openModeSelection(true);
    }
  };

  const handleHowToPlayClick = () => {
    if (askRtfm) {
      muteAskRtfm();
    }
    navigate('/how-to-play');
  };

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
              onClick={handleNewGameClick}
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
              onClick={handleHowToPlayClick}
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
      <>
        <ModeSelect
          selectMode={modeSelection}
          openSelectMode={openModeSelection}
          newGameGradient="bg-linear-to-r from-lime-700 via-rose-700 to-violet-500"
          newGameHoverGradient="hover:bg-linear-to-r hover:from-lime-700 hover:via-rose-700 hover:to-violet-500"
        />
        <AskRtfm
          askRtfmOpen={askRtfmOpen}
          setAskRtfmOpen={setAskRtfmOpen}
          menuButtonClicked={false}
          setMenuButtonClicked={() => {}}
          openModeSelection={openModeSelection}
        />
      </>
    </PageTransition>
  );
}
