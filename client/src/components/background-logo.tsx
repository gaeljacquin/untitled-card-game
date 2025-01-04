import AnimatedLogoDynamic from '@/components/animated-logo-dynamic';
import { cn } from '@/lib/utils';

export default function BackgroundLogo() {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-50 z-0">
      <span className={cn('w-[56rem] h-auto', 'bg-transparent grayscale')}>
        <AnimatedLogoDynamic logo={'game'} loop={false} autoplay={false} />
      </span>
    </div>
  );
}
