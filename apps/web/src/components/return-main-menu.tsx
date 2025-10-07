import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ReturnMainMenu({ className }: { className?: string }) {
  return (
    <Link to="/">
      <Button
        variant="ghost"
        className={cn(className, 'hover:cursor-pointer text-white hover:text-black')}
      >
        <ArrowLeft className="mr-2 size-4" />
        Return to Main Menu
      </Button>
    </Link>
  );
}
