'use client';

import { cn } from '@/lib/utils';

interface TerminalDisplayProps {
  value: number;
  noBueno?: boolean;
  className?: string;
}

export function TerminalDisplay({ value, noBueno = false, className }: TerminalDisplayProps) {
  return (
    <span
      className={cn(
        'px-2 py-1 rounded-sm inline-flex items-center justify-center min-w-[80px]',
        'border shadow-[0_0_2px]',
        noBueno
          ? 'bg-black text-red-500 border-red-600/50 shadow-red-500/50 terminal-shadow-red'
          : 'bg-black text-green-500 border-green-600/50 shadow-green-500/50 terminal-shadow-green',
        className
      )}
    >
      {value.toLocaleString()}
    </span>
  );
}
