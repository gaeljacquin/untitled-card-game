import GameSidebar from '@/components/game-sidebar';
import PlayingField from '@/components/playing-field';

export default function Game() {
  return (
    <div className="flex flex-row gap-4 justify-between">
      <GameSidebar />
      <PlayingField />
    </div>
  );
}
