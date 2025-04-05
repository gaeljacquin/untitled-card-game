import { getRandomIndex } from '@gaeljacquin/ucg-shared';
import playlist from 'assets/playlist.json';
import { AudioState, Tracks } from 'types/audio';
import { StateCreator } from 'zustand';

const tracks: Tracks = playlist ?? [];

export const createAudioSlice: StateCreator<AudioState> = (set, get) => ({
  playing: true,
  volume: 0.2,
  muted: false,
  currentTrackIndex: getRandomIndex(tracks),
  tracks,
  setPlaying: (playing: boolean) => set({ playing }),
  setVolume: (volume: number) => set({ volume }),
  setMuted: (muted: boolean) => set({ muted }),
  nextTrack: () =>
    set((state: AudioState) => ({
      currentTrackIndex: (state.currentTrackIndex + 1) % state.tracks.length,
    })),
  previousTrack: () =>
    set((state: AudioState) => ({
      currentTrackIndex:
        state.currentTrackIndex === 0 ? state.tracks.length - 1 : state.currentTrackIndex - 1,
    })),
  getCurrentTrack: () => get().tracks[get().currentTrackIndex],
});
