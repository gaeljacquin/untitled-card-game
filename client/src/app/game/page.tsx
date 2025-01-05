import ReturnMainMenu from '@/components/return-main-menu';
import { PageTransition } from '@/components/ui/page-transition';
import Game from '@/views/game';

export default function Page() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-lime-700 via-rose-700 to-violet-500 text-white">
        <div className="relative container mx-auto px-4 py-16">
          <ReturnMainMenu className="absolute top-4 left-4" />
          <Game />
        </div>
      </div>
    </PageTransition>
  );
}
