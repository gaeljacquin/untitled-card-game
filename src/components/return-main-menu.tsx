import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ReturnMainMenu() {
  return (
    <Link href={'/'}>
      <Button variant="ghost" className="absolute top-4 left-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Return to Main Menu
      </Button>
    </Link>
  );
}
