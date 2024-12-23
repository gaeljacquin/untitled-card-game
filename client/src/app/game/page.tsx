import ReturnMainMenu from '@/components/return-main-menu';
import { PageTransition } from '@/components/ui/page-transition';
import Game from '@/views/game';

export default function Page() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-cyan-700 to-emerald-800 text-white">
        <div className="relative mx-auto px-4 py-16">
          <ReturnMainMenu />
          <Game />
        </div>
      </div>
    </PageTransition>
  );
}
