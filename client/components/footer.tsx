import { cn } from 'lib/utils';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex items-center justify-center">
      <footer
        className={cn(
          'px-4 py-8 text-center text-indigo-300 relative z-10 bg-transparent',
          'bottom-0'
        )}
      >
        <p className="text-white">
          &copy; 2024 - {currentYear}{' '}
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
