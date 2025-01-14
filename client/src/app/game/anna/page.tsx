import ReturnMainMenu from '@/components/return-main-menu';
import { PageTransition } from '@/components/ui/page-transition';
import { cn } from '@/lib/utils';
import ABMode from '@/views/ab-mode';

export default function Page() {
  const modeSlug = 'anna';
  const gridClass = cn(
    'grid gap-2 md:gap-3',
    'grid-cols-4 sm:grid-cols-[30px_repeat(4,_minmax(0,_1fr))]',
    'grid-rows-4 sm:grid-rows-[40px_repeat(4,_minmax(0,_1fr))]',
    'w-full max-w-full',
    '[&>*]:w-full [&>*]:aspect-[3/4]',
    'md:[&>.cell]:w-[100px] md:[&>.cell]:h-[133px]',
    'lg:[&>.cell]:w-[120px] lg:[&>.cell]:h-[160px]',
    'mx-auto justify-center items-center',
    'bg-amber-950/30 rounded-xl p-6 md:p-10'
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-lime-700 via-rose-700 to-violet-500 text-white">
        <div className="relative container mx-auto px-4 py-16">
          <ReturnMainMenu className="absolute top-4 left-4" />
          <ABMode modeSlug={modeSlug} gridClass={gridClass} />
        </div>
      </div>
    </PageTransition>
  );
}
