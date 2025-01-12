import ReturnMainMenu from '@/components/return-main-menu';
import { PageTransition } from '@/components/ui/page-transition';
import { cn } from '@/lib/utils';
import ABMode from '@/views/ab-mode';

export default function Page() {
  const modeSlug = 'mode-2';
  const gridClass = cn('grid grid-cols-5 gap-2 md:gap-4 bg-amber-950/30 rounded-2xl p-2 md:p-4');
  const howToPlayText = () => {
    return (
      <ul className="list-disc list-inside space-y-5 text-white text-sm text-start">
        <li>6 cards are dealt at the start of the game</li>
        <li>Drag any 5 cards from your hand to an available cell in the grid</li>
        <li>Make a poker hand on any row and column in the grid</li>
        <li>Click 'Confirm'</li>
        <li>The remaining card is discarded, and a new set of 6 cards is dealt</li>
        <li>Rinse and repeat until the grid is filled</li>
        <li>
          For an extra challenge, try to make a poker hand using the center and corners of the grid!
        </li>
        <li>
          <span className="font-bold uppercase">Tip 1:</span> Aces have a value of 1
        </li>
      </ul>
    );
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-lime-700 via-rose-700 to-violet-500 text-white">
        <div className="relative container mx-auto px-4 py-16">
          <ReturnMainMenu className="absolute top-4 left-4" />
          <ABMode modeSlug={modeSlug} howToPlayText={howToPlayText()} gridClass={gridClass} />
        </div>
      </div>
    </PageTransition>
  );
}
