'use client';

import { ReactNode } from 'react';
import { AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function LiveScore(props: Props) {
  const { children, className } = props;

  return (
    <>
      <AnimatePresence>
        <div className={cn(className)}>{children}</div>
      </AnimatePresence>
    </>
  );
}
