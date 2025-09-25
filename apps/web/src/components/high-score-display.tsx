'use client';

import { SlugId } from '@untitled-card-game/shared';
import { useUcgStore } from '@/stores/ucg-store';

const HighScoreDisplay = ({ modeSlug }: { modeSlug: SlugId }) => {
  const { getHighScore } = useUcgStore();
  const highScoreDate = new Date(getHighScore(modeSlug).date);
  const formattedDate =
    highScoreDate.getMonth() +
    1 +
    '/' +
    highScoreDate.getDate() +
    '/' +
    highScoreDate.getFullYear();

  return (
    <div className="flex flex-col gap-2 my-4 p-4 bg-amber-950/60 rounded-xl">
      <p className="text-md">High Score</p>
      <p className="text-sm">${getHighScore(modeSlug).value}</p>
      <p className="text-sm">{formattedDate}</p>
    </div>
  );
};

export default HighScoreDisplay;
