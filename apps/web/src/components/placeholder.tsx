import { Loader2 } from 'lucide-react';

export default function Placeholder() {
  return (
    <div className="bg-amber-950/30 rounded-xl p-6 md:p-10 flex items-center justify-center">
      <Loader2 className="mr-2 size-4 animate-spin" />
    </div>
  );
}
