import ReturnMainMenu from 'components/return-main-menu';
import { PageTransition } from 'components/ui/page-transition';
import Settings from 'views/settings';

export default function Page() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-linear-to-br from-purple-900 via-pink-700 to-pink-800 text-white">
        <div className="relative container mx-auto px-4 py-16">
          <ReturnMainMenu className="absolute top-4 left-4" />
          <Settings />
        </div>
      </div>
    </PageTransition>
  );
}
