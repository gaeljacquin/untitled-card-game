import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

export default function ReturnMainMenu(props: Props) {
  const { className } = props;

  return (
    <Link href={'/'}>
      <Button variant="ghost" className={cn(className)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Return to Main Menu
      </Button>
    </Link>
  );
}
