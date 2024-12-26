'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Footer() {
  const pathname = usePathname();

  return (
    <div className="relative container mx-auto flex flex-col items-center justify-center">
      <footer className={cn('absolute -mt-16 z-50', pathname === '/' ? 'hidden' : 'block')}>
        <p className="text-white">
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
  );
}
