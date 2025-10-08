import { cn } from '@/lib/utils';
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
          <a
            href={import.meta.env.VITE_LINKTREE ?? ''}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-white"
          >
            {import.meta.env.VITE_AUTHOR}
          </a>
          . All rights reserved.
        </p>
      </footer>
    </div>
  );
}
