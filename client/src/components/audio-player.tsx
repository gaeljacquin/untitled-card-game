'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import audioStore from '@/stores/audio';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

type Props = {
  showControls?: boolean;
};

export default function AudioPlayer(props: Props) {
  const { showControls } = props;
  const { playing, volume, muted, getCurrentTrack } = audioStore();
  const [mounted, setMounted] = useState(false);
  const track = getCurrentTrack();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={showControls ? 'w-full max-w-2xl mx-auto' : 'hidden'}>
      <ReactPlayer
        url={track.url}
        playing={playing}
        volume={volume}
        muted={muted}
        width="100%"
        height="100px"
        controls={showControls}
      />
    </div>
  );
}
