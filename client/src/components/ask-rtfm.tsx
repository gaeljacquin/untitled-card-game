'use client';

import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import miscStore from '@/stores/misc';

type Props = {
  askRtfmOpen: boolean;
  setAskRtfmOpen: (isOpen: boolean) => void;
  newGameClicked: boolean;
  setNewGameClicked: (clicked: boolean) => void;
  menuButtonClicked: boolean;
  setMenuButtonClicked: (clicked: boolean) => void;
};

export default function AskRtfm(props: Props) {
  const {
    askRtfmOpen,
    newGameClicked,
    menuButtonClicked,
    setAskRtfmOpen,
    setNewGameClicked,
    setMenuButtonClicked,
  } = props;
  const { muteAskRtfm } = miscStore();
  const anyButtonClicked = newGameClicked || menuButtonClicked;

  const handleClose = () => {
    if (!anyButtonClicked) {
      setAskRtfmOpen(false);
    }
  };

  return (
    <Dialog open={askRtfmOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white/10 backdrop-blur-sm border-white rounded-2xl text-white max-w-xl h-1/6">
        <DialogHeader>
          <DialogTitle>Not so fast</DialogTitle>
        </DialogHeader>
        <p className="text-md">Do you want to read the friendly manual before proceeding?</p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/how-to-play"
            className={cn('w-full', anyButtonClicked && 'pointer-events-none opacity-50')}
          >
            <Button
              type="button"
              variant="outline"
              className={cn('w-full px-7', 'text-black')}
              onClick={() => {
                setMenuButtonClicked(true);
                muteAskRtfm();
              }}
              disabled={anyButtonClicked}
            >
              Sure thing 😅
            </Button>
          </Link>
          <Link
            href="/game"
            className={cn('w-full', anyButtonClicked && 'pointer-events-none opacity-50')}
          >
            <Button
              type="button"
              variant="destructive"
              className={cn('w-full px-7')}
              onClick={() => {
                muteAskRtfm();
                setNewGameClicked(true);
              }}
              disabled={anyButtonClicked}
            >
              {newGameClicked ? (
                <>
                  <span>Loading</span>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                <span>I&apos;ll take my chances 😎</span>
              )}
            </Button>
          </Link>
        </div>
        {/* <>
          <p className="text-sm">
            Once you choose an option, you won&apos;t see this annoying pop-up again 😉
          </p>
        </> */}
      </DialogContent>
    </Dialog>
  );
}
