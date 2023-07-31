import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

/**
 * record the user's path history hooks
 */
const usePathHistory = () => {
  const router = useRouter();

  const pathHistoryRef = useRef<string[]>();

  useEffect(() => {
    const newPathHistory = router.pathname;

    const storedPathHistory = localStorage.getItem('pathHistory');

    // Save the first path array if there is no path history history
    if (!storedPathHistory) {
      return localStorage.setItem(
        'pathHistory',
        JSON.stringify([newPathHistory]),
      );
    }

    if (storedPathHistory) {
      const existPathHistory: string[] = JSON.parse(storedPathHistory);

      if (existPathHistory.length < 5) {
        const history = [...existPathHistory, newPathHistory];

        pathHistoryRef.current = history;

        return localStorage.setItem('pathHistory', JSON.stringify(history));
      }

      // Up to 5 path history records are allowed
      if (existPathHistory.length >= 5) {
        const history = [...existPathHistory, newPathHistory].slice(1);

        pathHistoryRef.current = history;

        return localStorage.setItem('pathHistory', JSON.stringify(history));
      }
    }
  }, [router.pathname]);

  return { pathHistory: pathHistoryRef.current };
};

export default usePathHistory;
