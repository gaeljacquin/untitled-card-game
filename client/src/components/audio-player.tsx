'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import audioStore from '@/stores/audio';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function AudioPlayer() {
  const { playing, volume, muted, getCurrentTrack } = audioStore();
  const [mounted, setMounted] = useState(false);
  const track = getCurrentTrack();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="hidden">
      <ReactPlayer
        url={track.url}
        playing={playing}
        volume={volume}
        muted={muted}
        width="0"
        height="0"
      />
    </div>
  );
}
