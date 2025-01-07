import ReturnMainMenu from '@/components/return-main-menu';
import { PageTransition } from '@/components/ui/page-transition';
import ABMode3 from '@/views/ab-mode-3';

export default function Page() {
  const modeSlug = 'mode-3';

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-lime-700 via-rose-700 to-violet-500 text-white">
        <div className="relative container mx-auto px-4 py-16">
          <ReturnMainMenu className="absolute top-4 left-4" />
          <ABMode3 modeSlug={modeSlug} />
        </div>
      </div>
    </PageTransition>
  );
}
