'use client';

import Footer from '@/components/footer';
import ReturnMainMenu from '@/components/return-main-menu';
import SectionCard from '@/components/section-card';
import { PageTransition } from '@/components/ui/page-transition';

export default function NotFound() {
  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-emerald-700 via-slate-700 to-lime-500">
        <div className="min-h-screen flex flex-col items-center justify-center p-4 absolute z-50 inset-0">
          <SectionCard
            title="Nothing to see here..."
            className="text-center text-white p-8 text-3xl"
          >
            <ReturnMainMenu className="text-lg" />
          </SectionCard>
        </div>
        <Footer />
      </div>
    </PageTransition>
  );
}
