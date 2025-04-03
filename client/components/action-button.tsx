'use client';

import { ABCards } from '@untitled-card-game/shared/core/card';
import { Button } from 'components/ui/button';

const ActionButton = ({
  gameOver,
  isGridFull,
  playerHand,
  isDealing,
  handleDiscard,
  playAgain,
  progress,
}: {
  gameOver: boolean;
  isGridFull: boolean;
  playerHand: ABCards;
  isDealing: boolean;
  handleDiscard: () => void;
  playAgain: () => void;
  progress: number;
}) => {
  if (gameOver) {
    return (
      <Button
        onClick={playAgain}
        disabled={progress !== 100}
        className="text-wrap truncate w-full hover:cursor-pointer"
      >
        New Game
      </Button>
    );
  }

  return (
    <Button
      onClick={handleDiscard}
      disabled={playerHand.length !== 1 || isDealing}
      className="truncate p-4"
    >
      <span className="flex w-full items-center justify-center">
        {isGridFull ? 'Finish' : 'Next'}
      </span>
    </Button>
  );
};

export default ActionButton;
