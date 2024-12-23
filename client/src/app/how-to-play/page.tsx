import ReturnMainMenu from '@/components/return-main-menu';
import { PageTransition } from '@/components/ui/page-transition';
import HowToPlay from '@/views/how-to-play';

export default function Page() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-amber-800 via-yellow-800 to-orange-700 text-white">
        <div className="relative container mx-auto px-4 py-16">
          <ReturnMainMenu />
          <HowToPlay />
        </div>
      </div>
    </PageTransition>
  );
}
