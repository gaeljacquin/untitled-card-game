'use client';

import { Suspense } from 'react';
import Placeholder from 'components/placeholder';
import dynamic from 'next/dynamic';
import { useUcgStore } from 'stores/main-store';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function AudioPlayer() {
  const { playing, volume, muted, getCurrentTrack } = useUcgStore();
  const track = getCurrentTrack() ?? '';

  return (
    <Suspense fallback={<Placeholder />}>
      <div className="hidden">
        <ReactPlayer
          url={track.url ?? ''}
          playing={playing}
          volume={volume}
          muted={muted}
          width="0"
          height="0"
        />
      </div>
    </Suspense>
  );
}
