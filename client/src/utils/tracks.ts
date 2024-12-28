import { shuffler } from '@annabelle/shared/src/functions/shufflers';
import { Tracks } from '@/types/audio';

const tracks: Tracks = [];

const shuffledPlaylist: Tracks = shuffler(tracks) as Tracks;

export default shuffledPlaylist;
