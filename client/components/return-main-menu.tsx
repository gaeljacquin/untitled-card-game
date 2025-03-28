import { Button } from 'components/ui/button';
import { cn } from 'lib/utils';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type Props = {
  className?: string;
};

export default function ReturnMainMenu(props: Props) {
  const { className } = props;

  return (
    <Link href="/">
      <Button variant="ghost" className={cn(className, 'hover:cursor-pointer')}>
        <ArrowLeft className="mr-2 size-4" />
        Return to Main Menu
      </Button>
    </Link>
  );
}
