import { ABMode } from '@annabelle/shared/core/mode';
import ReturnMainMenu from '@/components/return-main-menu';
import { PageTransition } from '@/components/ui/page-transition';
import ABMode2 from '@/views/ab-mode-2';

export default function Page() {
  const modeSlug = 'mode-2';
  const mode = ABMode.getMode(modeSlug)!;
  const gridClass = `grid grid-cols-[auto,repeat(${mode.gridSize},1fr)]`;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-lime-700 via-rose-700 to-violet-500 text-white">
        <div className="relative container mx-auto px-4 py-16">
          <ReturnMainMenu className="absolute top-4 left-4" />
          <ABMode2 modeSlug={modeSlug} gridClass={gridClass} />
        </div>
      </div>
    </PageTransition>
  );
}
