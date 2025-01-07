'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type Props = {
  selectMode: boolean;
  openSelectMode: (isOpen: boolean) => void;
  newGameGradient: string;
  newGameHoverGradient: string;
};

export default function ModeSelect(props: Props) {
  const { selectMode, openSelectMode, newGameGradient, newGameHoverGradient } = props;
  const [anyButtonClicked, setAnyButtonClicked] = useState(false);
  const [clickedButton, setClickedButton] = useState<string>();

  const modes = [
    {
      title: 'Poker (4 x 4)',
      description: 'Make the best poker hands in a 4 x 4 grid!',
      slug: 'mode-1',
    },
    {
      title: 'Poker (5 x 5)',
      description: 'Make the best poker hands in a 5 x 5 grid!',
      slug: 'mode-2',
    },
    {
      title: 'Words (5 x 5)',
      description: 'Make the highest scoring words in a 5 x 5 grid!',
      slug: 'mode-3',
    },
  ];

  const handleClose = () => {
    if (!anyButtonClicked) {
      openSelectMode(false);
    }
  };

  return (
    <Dialog open={selectMode} onOpenChange={handleClose}>
      <DialogContent className="bg-white/10 backdrop-blur-sm border-white rounded-2xl text-white max-w-xl h-auto">
        <DialogHeader>
          <DialogTitle className={cn('text-center', anyButtonClicked && 'text-white/70')}>
            Select Mode
          </DialogTitle>
          <DialogDescription
            className={cn('text-center text-white/80', anyButtonClicked && 'text-white/70')}
          >
            Make the best poker hands or highest scoring words in a grid!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-8">
          {modes.map((item) => (
            <Link
              key={item.slug}
              href={'/game/' + item.slug}
              className={cn('w-full', anyButtonClicked && 'pointer-events-none opacity-50')}
            >
              <Button
                type="button"
                className={cn(
                  'w-full h-auto px-7 py-4 text-md',
                  anyButtonClicked && clickedButton === item.slug ? newGameGradient : 'bg-gray-700',
                  newGameHoverGradient
                )}
                onClick={() => {
                  setAnyButtonClicked(true);
                  setClickedButton(item.slug);
                }}
                disabled={anyButtonClicked && clickedButton !== item.slug}
              >
                {anyButtonClicked && clickedButton === item.slug ? (
                  <>
                    <span>Loading {item.title}</span>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <span>{item.title}</span>
                )}
              </Button>
            </Link>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
