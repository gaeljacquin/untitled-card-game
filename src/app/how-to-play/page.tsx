import ReturnMainMenu from '@/components/return-main-menu';
import { PageTransition } from '@/components/ui/page-transition';
import HowToPlay from '@/views/how-to-play';

export default function Page() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-700 to-orange-800 text-white">
        <div className="relative container mx-auto px-4 py-16">
          <ReturnMainMenu />
          <HowToPlay />
        </div>
      </div>
    </PageTransition>
  );
}
