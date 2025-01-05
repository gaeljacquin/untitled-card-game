'use client';

import Footer from '@/components/footer';
import ReturnMainMenu from '@/components/return-main-menu';
import SectionCard from '@/components/section-card';
import { PageTransition } from '@/components/ui/page-transition';

export default function NotFound() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-cyan-700 to-emerald-800">
        <div className="min-h-screen relative container flex flex-col items-center justify-center p-4 absolute z-50 inset-0">
          <SectionCard
            title="Nothing to see here..."
            className="text-center text-white p-8 text-3xl"
          >
            <ReturnMainMenu className="text-lg" />
          </SectionCard>

          <div className="absolute bottom-0 left-0 right-0 z-10">
            <Footer />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
