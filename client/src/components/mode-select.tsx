'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ABMode } from '@untitled-card-game/shared/core/mode';
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
import miscStore from '@/stores/misc';

type Props = {
  selectMode: boolean;
  openSelectMode: (isOpen: boolean) => void;
  newGameGradient: string;
  newGameHoverGradient: string;
};

export default function ModeSelect(props: Props) {
  const { selectMode, openSelectMode, newGameGradient, newGameHoverGradient } = props;
  const { askRtfm, muteAskRtfm } = miscStore();
  const [anyButtonClicked, setAnyButtonClicked] = useState(false);
  const [clickedButton, setClickedButton] = useState<string>();
  const modes = ABMode.getModes();

  const handleClose = () => {
    if (!anyButtonClicked) {
      openSelectMode(false);
    }
  };

  return (
    <Dialog open={selectMode} onOpenChange={handleClose}>
      <DialogContent className="bg-white/10 backdrop-blur-sm border-white rounded-2xl text-white max-w-xl h-auto">
        <DialogHeader>
          <DialogTitle
            className={cn('text-center text-lg sm:text-xl', anyButtonClicked && 'text-white/70')}
          >
            Select Mode
          </DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          {modes.map((item: ABMode) => (
            <Link
              key={item.slug}
              href={'/game/' + item.slug}
              className={cn('w-full', anyButtonClicked && 'pointer-events-none opacity-50')}
            >
              <Button
                type="button"
                className={cn(
                  'w-full h-auto py-12 text-md sm:text-lg rounded-2xl',
                  anyButtonClicked ? 'px-8' : 'px-16',
                  anyButtonClicked && clickedButton === item.slug ? newGameGradient : 'bg-gray-700',
                  newGameHoverGradient
                )}
                onClick={() => {
                  if (askRtfm) {
                    muteAskRtfm();
                  }
                  setAnyButtonClicked(true);
                  setClickedButton(item.slug);
                }}
                disabled={anyButtonClicked && clickedButton !== item.slug}
              >
                {anyButtonClicked && clickedButton === item.slug ? (
                  <>
                    <span>Loading {item.title}</span>
                    <Loader2 className="h-4 w-4 animate-spin" />
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
