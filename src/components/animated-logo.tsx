'use client';

import { useRef } from 'react';
import type { LottieRefCurrentProps } from 'lottie-react';
import Lottie from 'lottie-react';
import gameLogo from '@/assets/game-logo.json';
import myLogo from '@/assets/my-logo.json';
import { AnimatedLogoProps } from '@/types/animated-logo';

export default function AnimatedLogo(props: AnimatedLogoProps) {
  const { loop, logo } = props;
  const logoRef = useRef<LottieRefCurrentProps>(null);
  let animationData;

  switch (logo) {
    case 'game':
      animationData = gameLogo;
      break;
    case 'mine':
      animationData = myLogo;
      break;
    default:
      animationData = null;
      break;
  }

  return <Lottie lottieRef={logoRef} animationData={animationData} loop={loop} />;
}
