'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface GameOverModalProps {
  isOpen: boolean;
  onRestart: () => void;
}

export default function GameOverModal({ isOpen, onRestart }: GameOverModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Game Over!</DialogTitle>
          <DialogDescription>
            You've filled the entire grid. Would you like to play again?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button onClick={onRestart}>Play Again</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
