import { AnimatedLogoProps } from '@/types/animated-logo';
import appinfo from '@/utils/appinfo';
import AnimatedLogo from '@/components/animated-logo';

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
