'use client';

import { Button } from 'components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from 'components/ui/dialog';
import { cn } from 'lib/utils';
import Link from 'next/link';
import { useUcgStore } from 'stores/main-store';

export default function AskRtfm({
  askRtfmOpen,
  menuButtonClicked,
  setAskRtfmOpen,
  setMenuButtonClicked,
  openModeSelection,
}: {
  askRtfmOpen: boolean;
  setAskRtfmOpen: (isOpen: boolean) => void;
  menuButtonClicked: boolean;
  setMenuButtonClicked: (clicked: boolean) => void;
  openModeSelection: (arg0: boolean) => void;
}) {
  const { muteAskRtfm } = useUcgStore();

  const handleClose = () => {
    if (!menuButtonClicked) {
      setAskRtfmOpen(false);
    }
  };

  return (
    <Dialog open={askRtfmOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white/10 backdrop-blur-xs border-white rounded-2xl text-white max-w-xl h-1/6">
        <DialogHeader>
          <DialogTitle>Not so fast</DialogTitle>
          <DialogDescription className="hidden" />
        </DialogHeader>
        <p className="text-md">Do you want to read the friendly manual before proceeding?</p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/how-to-play"
            className={cn('w-full', menuButtonClicked && 'pointer-events-none opacity-50')}
          >
            <Button
              type="button"
              variant="outline"
              className={cn('w-full px-7 text-black cursor-pointer')}
              onClick={() => {
                setMenuButtonClicked(true);
                muteAskRtfm();
              }}
              disabled={menuButtonClicked}
            >
              Sure thing 😅
            </Button>
          </Link>
          <Button
            type="button"
            variant="destructive"
            className={cn('w-full px-7 cursor-pointer')}
            onClick={() => {
              openModeSelection(true);
              handleClose();
            }}
            disabled={menuButtonClicked}
          >
            <span>I&apos;ll take my chances 😎</span>
          </Button>
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
