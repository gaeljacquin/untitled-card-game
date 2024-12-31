'use client';

import { usePathname } from 'next/navigation';
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import audioStore from '@/stores/audio';
import settingsStore from '@/stores/settings';

type Props = {
  className?: string;
};

export default function AudioControls(props: Props) {
  const { className } = props;
  const {
    playing,
    volume,
    muted,
    setPlaying,
    setVolume,
    setMuted,
    nextTrack,
    previousTrack,
    getCurrentTrack,
  } = audioStore();
  const { showAudioPlayer } = settingsStore();
  const track = getCurrentTrack() ?? '';
  const pathname = usePathname();

  return (
    <div className={cn(className, pathname !== '/settings' && !showAudioPlayer && 'hidden')}>
      <div className="text-md text-white text-center">
        <p>Now Playing</p>
        <p>
          {track.title ?? ''} - {track.artist ?? ''}
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <Button size="icon" onClick={previousTrack}>
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button size="icon" onClick={() => setPlaying(!playing)}>
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button size="icon" onClick={nextTrack}>
          <SkipForward className="h-4 w-4" />
        </Button>
        <Button size="icon" onClick={() => setMuted(!muted)}>
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
        <div className="w-[200px]">
          <Slider
            value={[volume * 100]}
            max={100}
            step={1}
            onValueChange={(value) => setVolume(value[0] / 100)}
          />
        </div>
      </div>
    </div>
  );
}
