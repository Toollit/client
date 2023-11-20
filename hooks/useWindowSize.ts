import React, { useEffect, useState } from 'react';

interface WindowSizeState {
  width: number;
  height: number;
  isMobile: boolean | null;
  isTablet: boolean | null;
  isLaptop: boolean | null;
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSizeState>({
    width: 0,
    height: 0,
    isMobile: null,
    isTablet: null,
    isLaptop: null,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 425 ? true : false,
        isTablet:
          window.innerWidth >= 425 && window.innerWidth < 1024 ? true : false,
        isLaptop: window.innerWidth >= 1024 ? true : false,
      });
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
