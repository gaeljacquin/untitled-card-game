'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import AnimatedLogoDynamic from '@/components/animated-logo-dynamic';
import AskRtfm from '@/components/ask-rtfm';
import AudioControlsDynamic from '@/components/audio-controls-dynamic';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { Button } from '@/components/ui/button';
import InteractiveHoverButton from '@/components/ui/interactive-hover-button';
import { PageTransition } from '@/components/ui/page-transition';
import { cn } from '@/lib/utils';
import miscStore from '@/stores/misc';
import appinfo from '@/utils/appinfo';

export default function Home() {
  const { askRtfm, muteAskRtfm } = miscStore();
  const [newGameClicked, setNewGameClicked] = useState(false);
  const [menuButtonClicked, setMenuButtonClicked] = useState(false);
  const [askRtfmOpen, setAskRtfmOpen] = useState(false);
  const menuItems = [
    {
      label: 'New Game',
      slug: 'game',
      gradient: 'bg-gradient-to-r from-cyan-600 to-emerald-900',
    },
    {
      label: 'How to Play',
      slug: 'how-to-play',
      gradient: 'bg-gradient-to-r from-yellow-700 to-rose-700',
    },
    {
      label: 'Settings',
      slug: 'settings',
      gradient: 'bg-gradient-to-r from-purple-800 to-pink-700',
    },
    {
      label: 'Credits',
      slug: 'credits',
      gradient: 'bg-gradient-to-r from-fuchsia-800 to-sky-700',
    },
  ];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, slug: string) => {
    switch (slug) {
      case 'game':
        if (askRtfm) {
          e.preventDefault();
          setAskRtfmOpen(true);
        } else {
          setNewGameClicked(true);
        }
        break;
      case 'how-to-play':
        if (askRtfm) {
          muteAskRtfm();
        } else {
          setMenuButtonClicked(true);
        }
        break;
      default:
        setMenuButtonClicked(true);
        break;
    }
  };

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
            <div
              className={cn(
                'rounded-2xl mb-4 mx-auto flex items-center justify-center mb-7',
                'w-[56rem] h-32',
                'bg-transparent'
              )}
            >
              <AnimatedLogoDynamic logo={'game'} loop autoplay />
            </div>
            <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-green-200">
              {appinfo.description}
            </h3>
          </motion.div>

          <div className="sm:grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {newGameClicked ? (
                  <Button
                    className={cn(
                      'w-full h-16 text-lg border-0 rounded-full font-semibold',
                      item.slug === 'game' && item.gradient,
                      item.slug === 'game' && 'pointer-events-none'
                    )}
                    disabled={item.slug !== 'game'}
                  >
                    {item.slug === 'game' ? <span>Loading</span> : item.label}{' '}
                    {item.slug === 'game' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  </Button>
                ) : (
                  <Link href={'/' + item.slug}>
                    <InteractiveHoverButton
                      text={item.label}
                      className={cn(
                        'w-full h-16 text-lg border-0 opacity-75 hover:opacity-100',
                        menuButtonClicked && 'pointer-events-none'
                      )}
                      gradient={item.gradient}
                      onClick={(e) => handleClick(e, item.slug)}
                    />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
          <div>
            <AskRtfm
              askRtfmOpen={askRtfmOpen}
              setAskRtfmOpen={setAskRtfmOpen}
              setNewGameClicked={setNewGameClicked}
              newGameClicked={newGameClicked}
              menuButtonClicked={menuButtonClicked}
              setMenuButtonClicked={setMenuButtonClicked}
            />
            <AudioControlsDynamic className="space-y-8 bg-white/10 backdrop-blur-sm rounded-2xl p-8 mt-16 border" />
          </div>
        </div>
      </PageTransition>
    </BackgroundGradientAnimation>
  );
}
