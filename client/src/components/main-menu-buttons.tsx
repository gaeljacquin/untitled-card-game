'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InteractiveHoverButton from '@/components/ui/interactive-hover-button';
import { cn } from '@/lib/utils';

export default function MainMenuButtons() {
  const [newGameClicked, setNewGameClicked] = useState(false);
  const [menuButtonClicked, setMenuButtonClicked] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, slug: string) => {
    switch (slug) {
      case 'game':
        setNewGameClicked(true);
        break;
      default:
        setMenuButtonClicked(true);
        break;
    }
  };
  const menuItems = [
    {
      label: 'New Game',
      slug: 'game',
      gradient: 'bg-gradient-to-r from-lime-700 via-rose-700 to-violet-500',
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
    {
      label: 'AB Tools',
      slug: 'ab-tools',
      gradient: 'bg-gradient-to-br from-red-800 via-rose-500 to-slate-700',
    },
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-xl">
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
                'w-full h-16 text-sm sm:text-md md:text-lg border-0 rounded-full font-semibold',
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
                  'w-full h-16 xs:text-sm sm:text-md md:text-lg border-0 opacity-75 hover:opacity-100',
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
  );
}
