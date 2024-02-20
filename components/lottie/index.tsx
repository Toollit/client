import React, { useRef, useEffect } from 'react';
import lottie from 'lottie-web';

interface LottieAnimationProps {
  lottieJson: any;
}

const LottieAnimation = ({ lottieJson }: LottieAnimationProps) => {
  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: lottieJson,
    });
  }, [lottieJson]);

  return <div style={{ width: '100%', height: '100%' }} ref={container} />;
};

export default LottieAnimation;
