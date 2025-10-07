'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

import AskRtfm from '@/components/ask-rtfm';
import ModeSelect from '@/components/mode-select';
import InteractiveHoverButton from '@/components/ui/interactive-hover-button';
import { cn } from '@/lib/utils';
import { useUcgStore } from '@/stores/ucg-store';
import { isMaintenanceMode } from '@/utils/maintenance-mode';

export default function MainMenuButtons() {
  const { askRtfm, muteAskRtfm } = useUcgStore();
  const [modeSelection, openModeSelection] = useState(false);
  const [menuButtonClicked, setMenuButtonClicked] = useState(false);
  const [askRtfmOpen, setAskRtfmOpen] = useState(false);
  const newGameGradient = 'bg-linear-to-r from-lime-700 via-rose-700 to-violet-500';
  const newGameHoverGradient =
    'hover:bg-linear-to-r hover:from-lime-700 hover:via-rose-700 hover:to-violet-500';
  const menuItems = [
    {
      label: 'New Game',
      slug: 'game',
      gradient: newGameGradient,
      disabled: isMaintenanceMode,
    },
    {
      label: 'How to Play',
      slug: 'how-to-play',
      gradient: 'bg-linear-to-r from-red-800 via-rose-500 to-slate-700',
      disabled: false,
    },
    {
      label: 'Settings',
      slug: 'settings',
      gradient: 'bg-linear-to-r from-purple-800 to-pink-700',
      disabled: false,
    },
    {
      label: 'Credits',
      slug: 'credits',
      gradient: 'bg-linear-to-r from-fuchsia-800 to-sky-700',
      disabled: false,
    },
  ];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, slug: string) => {
    switch (slug) {
      case 'game':
        if (askRtfm) {
          e.preventDefault();
          setAskRtfmOpen(true);
        } else {
          e.preventDefault();
          openModeSelection(true);
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
    <div className="flex flex-col gap-8 w-full max-w-xl">
      {menuItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link to={'/' + item.slug}>
            <InteractiveHoverButton
              text={item.label}
              className={cn(
                'w-full h-16 xs:text-sm sm:text-md md:text-lg border-0 opacity-75 hover:opacity-100',
                (menuButtonClicked || item.disabled) && 'pointer-events-none'
              )}
              gradient={item.gradient}
              onClick={(e) => handleClick(e, item.slug)}
              disabled={item.disabled}
            />
          </Link>
        </motion.div>
      ))}
      <>
        <ModeSelect
          selectMode={modeSelection}
          openSelectMode={openModeSelection}
          newGameGradient={newGameGradient}
          newGameHoverGradient={newGameHoverGradient}
        />
        <AskRtfm
          askRtfmOpen={askRtfmOpen}
          setAskRtfmOpen={setAskRtfmOpen}
          menuButtonClicked={menuButtonClicked}
          setMenuButtonClicked={setMenuButtonClicked}
          openModeSelection={openModeSelection}
        />
      </>
    </div>
  );
}
