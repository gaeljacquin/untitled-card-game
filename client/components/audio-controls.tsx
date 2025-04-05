'use client';

import { Button } from 'components/ui/button';
import { Slider } from 'components/ui/slider';
import { cn } from 'lib/utils';
import {
  ChevronDown,
  ChevronUp,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useUcgStore } from 'stores/main-store';

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
    audioPlayerVisible,
    toggleAudioPlayerVisibility,
  } = useUcgStore();
  const track = getCurrentTrack() ?? '';
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 text-white z-10 text-white',
        audioPlayerVisible
          ? 'p-2 md:p-4 bg-black/30 backdrop-filter backdrop-blur-lg'
          : 'bg-transparent',
        'transition-all duration-300 ease-in-out'
      )}
    >
      <button
        onClick={toggleAudioPlayerVisibility}
        className={cn(
          'absolute left-1/2 transform -translate-x-1/2 bg-black/30 backdrop-filter backdrop-blur-lg text-white py-1 px-9 rounded-t-md focus:outline-hidden',
          'transition-all duration-300 ease-in-out',
          audioPlayerVisible ? 'translate-y-0 -top-8' : 'translate-y-full -top-0.5 sm:-top-4',
          isHome ? 'text-white' : 'text-transparent hover:text-white'
        )}
        aria-label={audioPlayerVisible ? 'Hide audio player' : 'Show audio player'}
      >
        {audioPlayerVisible ? (
          <ChevronDown className={cn('w-6 h-6', isHome && 'animate-bounce')} />
        ) : (
          <ChevronUp className={cn('w-6 h-6', isHome && 'animate-pulse')} />
        )}
      </button>
      <div
        className={cn(
          'relative flex items-center w-full h-16 sm:h-12',
          'transition-all duration-300 ease-in-out',
          audioPlayerVisible ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        <div className="absolute left-0 shrink-0 mr-4 hidden sm:block pointer-events-none">
          <p className="text-sm text-clip sm:text-md font-semibold truncate">{track.title ?? ''}</p>
          <p className="text-xs text-clip sm:text-sm text-white/60 truncate">
            {track.artist ?? ''}
          </p>
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
            className="relative w-full bg-linear-to-r from-lime-400 via-rose-300 to-fuchsia-400 rounded-xl"
          >
            <span className="absolute h-full bg-emerald-700" />
          </Slider>
        </div>
      </div>
    </div>
  );
}
