import dynamic from 'next/dynamic';

const AudioControls = dynamic(() => import('components/audio-controls'), {
  ssr: false,
});

const AudioControlsDynamic = () => {
  return (
    <>
      <AudioControls />
      <span className="sr-only">Audio Player</span>
    </>
  );
};

export default AudioControlsDynamic;
