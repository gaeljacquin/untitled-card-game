import Link from 'next/link';
import ReturnMainMenu from '@/components/return-main-menu';
import { PageTransition } from '@/components/ui/page-transition';
import About from '@/views/about';

export default function Page() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-fuchsia-800 via-sky-700 to-blue-800 text-white">
        <div className="relative container mx-auto px-4 py-16">
          <ReturnMainMenu />
          <About />
        </div>
        <footer className="container mx-auto px-4 py-8 text-center">
          <p>
            © 2024{' '}
            <Link
              href={process.env.linktree ?? ''}
              target="_blank"
              className="hover:underline hover:text-white"
            >
              {process.env.author}
            </Link>
            . All rights reserved.
          </p>
        </footer>
      </div>
    </PageTransition>
  );
}
