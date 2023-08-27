import { useEffect, useState } from 'react';

const useCheckUserAgent = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const userAgent = window.navigator.userAgent;
      // navigator.userAgent.match(/Android|iPhone|iPad|iPod/i);
      setIsMobile(userAgent.indexOf('Mobi') > -1);
    }
  }, [isMobile]);

  return { isMobile };
};

export default useCheckUserAgent;
