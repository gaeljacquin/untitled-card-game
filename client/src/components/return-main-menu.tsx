import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ReturnMainMenu({ className }: { className?: string }) {
  return (
    <Link to="/">
      <Button variant="ghost" className={cn(className, 'hover:cursor-pointer')}>
        <ArrowLeft className="mr-2 size-4" />
        Return to Main Menu
      </Button>
    </Link>
  );
}


