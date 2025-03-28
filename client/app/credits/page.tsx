import ReturnMainMenu from 'components/return-main-menu';
import { PageTransition } from 'components/ui/page-transition';
import Credits from 'views/credits';

export default function Page() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-linear-to-br from-fuchsia-800 via-sky-700 to-blue-800 text-white">
        <div className="relative container mx-auto px-4 py-16">
          <ReturnMainMenu className="absolute top-4 left-4" />
          <Credits />
        </div>
      </div>
    </PageTransition>
  );
}
