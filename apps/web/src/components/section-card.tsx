'use client';

import { ReactNode } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function SectionCard({
  title,
  description,
  children,
  className,
  classNameTitle,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  classNameTitle?: string;
}) {
  return (
    <Card className={cn('backdrop-blur-xs bg-white/10 border-white/20', className)}>
      <CardHeader className="text-white">
        <CardTitle className={cn('text-2xl', classNameTitle)}>{title}</CardTitle>
        {description && (
          <CardDescription className="text-white/80 text-md">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
