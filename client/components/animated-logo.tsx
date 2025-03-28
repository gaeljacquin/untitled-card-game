'use client';

import { useRef } from 'react';
import type { LottieRefCurrentProps } from 'lottie-react';
import Lottie from 'lottie-react';
import { AnimatedLogoProps } from 'types/animated-logo';

import gameLogo from '@/assets/game-logo.json';

export default function AnimatedLogo(props: AnimatedLogoProps) {
  const { loop, autoplay } = props;
  const logoRef = useRef<LottieRefCurrentProps>(null);

  return <Lottie lottieRef={logoRef} animationData={gameLogo} loop={loop} autoplay={autoplay} />;
}
