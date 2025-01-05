'use client';

import { usePathname } from 'next/navigation';
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import audioStore from '@/stores/audio';
import settingsStore from '@/stores/settings';

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
  const { audioPlayerOnMain } = settingsStore();
  const track = getCurrentTrack() ?? '';
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 text-white p-2 md:p-4 z-10 bg-black/30 backdrop-filter backdrop-blur-lg',
        pathname === '/' && !audioPlayerOnMain && 'hidden'
      )}
    >
      <div className="relative flex items-center w-full h-16 sm:h-12">
        <div className="absolute left-0 flex-shrink-0 mr-4 hidden sm:block pointer-events-none">
          <p className="text-md font-semibold truncate">{track.title ?? ''}</p>
          <p className="text-sm text-white/60 truncate">{track.artist ?? ''}</p>
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
          <Button
            size="icon"
            onClick={previousTrack}
            className="bg-transparent hover:border hover:border-2 hover:bg-transparent"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            onClick={() => setPlaying(!playing)}
            className="bg-transparent hover:border hover:border-2 hover:bg-transparent"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            size="icon"
            onClick={nextTrack}
            className="bg-transparent hover:border hover:border-2 hover:bg-transparent"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            onClick={() => setMuted(!muted)}
            className="bg-transparent hover:border hover:border-2 hover:bg-transparent"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        </div>
        <div className="flex absolute right-0 items-center w-1/3 max-w-md hidden sm:block">
          <Slider
            value={[volume * 100]}
            max={100}
            step={1}
            onValueChange={(value) => setVolume(value[0] / 100)}
            className="relative w-full bg-lime-200 rounded-xl"
          >
            <span className="absolute h-full bg-emerald-700" />
          </Slider>
        </div>
      </div>
    </div>
  );
}
