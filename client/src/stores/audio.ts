import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AudioStore } from '@/types/audio';
import tracks from '@/utils/tracks';

const audioStore = create(
  persist(
    devtools<AudioStore>((set, get) => ({
      playing: true,
      volume: 0.2,
      muted: false,
      currentTrackIndex: 0,
      tracks,
      setPlaying: (playing) => set({ playing }),
      setVolume: (volume) => set({ volume }),
      setMuted: (muted) => set({ muted }),
      nextTrack: () =>
        set((state) => ({
          currentTrackIndex: (state.currentTrackIndex + 1) % state.tracks.length,
        })),
      previousTrack: () =>
        set((state) => ({
          currentTrackIndex:
            state.currentTrackIndex === 0 ? state.tracks.length - 1 : state.currentTrackIndex - 1,
        })),
      getCurrentTrack: () => get().tracks[get().currentTrackIndex],
    })),
    {
      name: 'audio',
    }
  )
);

export default audioStore;
