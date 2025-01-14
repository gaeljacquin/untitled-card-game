import dynamic from 'next/dynamic';
import { AnimatedLogoProps } from '@/types/animated-logo';
import appinfo from '@/utils/appinfo';

const AnimatedLogo = dynamic(() => import('@/components/animated-logo'), {
  ssr: false,
});

const AnimatedLogoDynamic = (props: AnimatedLogoProps) => {
  const { loop, autoplay = false } = props;

  return (
    <>
      <AnimatedLogo loop={loop} autoplay={autoplay} />
      <span className="sr-only">{appinfo.title}</span>
    </>
  );
};

export default AnimatedLogoDynamic;
