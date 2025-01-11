'use client';

import { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function LiveScore(props: Props) {
  const { children, className, title } = props;

  return (
    <>
      <div className="flex items-center justify-center gap-2 mb-4">
        <h2 className="text-lg text-center font-bold">{title}</h2>
      </div>
      <AnimatePresence>
        <div className={cn(className)}>{children}</div>
      </AnimatePresence>
    </>
  );
}
