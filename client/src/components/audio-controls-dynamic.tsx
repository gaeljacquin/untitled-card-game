import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

const AudioControls = dynamic(() => import('@/components/audio-controls'), {
  ssr: false,
});

const AudioControlsDynamic = (props: Props) => {
  const { className } = props;

  return (
    <>
      <AudioControls className={cn(className)} />
      <span className="sr-only">Audio Player</span>
    </>
  );
};

export default AudioControlsDynamic;
