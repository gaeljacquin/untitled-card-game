// 'use client';

// import { useEffect, useState } from 'react';
// import dynamic from 'next/dynamic';
// import { cn } from '@/lib/utils';
// import audioStore from '@/stores/audio';
// import settingsStore from '@/stores/settings';

// const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

// type Props = {
//   className?: string;
// };

// export default function AudioPlayer(props: Props) {
//   const { className = '' } = props;
//   const { playing, volume, muted, getCurrentTrack } = audioStore();
//   const { showAudioPlayer } = settingsStore();
//   const [mounted, setMounted] = useState(false);
//   const track = getCurrentTrack();

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null;

//   return (
//     <div className={cn(showAudioPlayer ? 'w-full max-w-2xl mx-auto' : 'hidden', className)}>
//       <ReactPlayer
//         url={track.url}
//         playing={playing}
//         volume={volume}
//         muted={muted}
//         width="100%"
//         height="100px"
//         controls={showAudioPlayer}
//       />
//     </div>
//   );
// }

type Props = {
  className?: string;
};

export default function AudioPlayer(props: Props) {
  void props;

  return <></>;
}
