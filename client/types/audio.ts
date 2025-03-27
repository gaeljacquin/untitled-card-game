import { Hydrate } from 'types/hydrate';

export type Track = {
  title: string;
  artist: string;
  url: string;
};

export type Tracks = Track[];

export type AudioStore = Hydrate & {
  playing: boolean;
  volume: number;
  muted: boolean;
  currentTrackIndex: number;
  tracks: Tracks;
  setPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
  nextTrack: () => void;
  previousTrack: () => void;
  getCurrentTrack: () => Track;
};
