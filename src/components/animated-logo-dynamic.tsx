import dynamic from 'next/dynamic';
import { AnimatedLogoProps } from '@/types/animated-logo';
import appinfo from '@/utils/appinfo';

const AnimatedLogo = dynamic(() => import('@/components/animated-logo'), {
  ssr: false,
});

const AnimatedLogoDynamic = ({ logo, loop }: AnimatedLogoProps) => {
  return (
    <>
      <AnimatedLogo logo={logo} loop={loop} />
      <span className="sr-only">{appinfo.title}</span>
    </>
  );
};

export default AnimatedLogoDynamic;
