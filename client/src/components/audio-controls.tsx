'use client';

import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import audioStore from '@/stores/audio';

export default function AudioControls() {
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
  const track = getCurrentTrack();

  return (
    <div className="space-y-8 flex flex-col items-center justify-center -mt-8">
      <div className="text-md font-medium text-white">
        Now Playing: {track.title} - {track.artist}
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
