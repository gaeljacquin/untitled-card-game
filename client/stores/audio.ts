import { getRandomIndex } from '@untitled-card-game/shared/functions/shuffle';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import playlist from '@/assets/playlist.json';
import { AudioStore, Tracks } from 'types/audio';

const tracks: Tracks = playlist ?? [];

const audioStore = create(
  persist(
    devtools<AudioStore>((set, get) => ({
      playing: true,
      volume: 0.2,
      muted: false,
      currentTrackIndex: getRandomIndex(tracks),
      tracks,
      _hasHydrated: false,
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
      setHasHydrated: (_hasHydrated) => {
        set({ _hasHydrated });
      },
    })),
    {
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true);
      },
      name: 'audio',
      partialize: (state) => {
        const { _hasHydrated, ...rest } = state;
        void _hasHydrated;

        return { ...rest };
      },
    }
  )
);

export default audioStore;
