'use client';

import Placeholder from 'components/placeholder';
import dynamic from 'next/dynamic';
import audioStore from 'stores/audio';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export default function AudioPlayer() {
  const { playing, volume, muted, _hasHydrated, getCurrentTrack } = audioStore();
  const track = getCurrentTrack() ?? '';

  if (!_hasHydrated) {
    return <Placeholder />;
  }

  return (
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
  );
}
