import Footer from '@/components/footer';
import ReturnMainMenu from '@/components/return-main-menu';
import { PageTransition } from '@/components/ui/page-transition';
import HowToPlay from '@/views/how-to-play';

export default function Page() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-red-800 via-rose-500 to-slate-700 text-white">
        <div className="relative container mx-auto px-4 py-16">
          <ReturnMainMenu className="absolute top-4 left-4" />
          <HowToPlay />
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
}
