import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

interface Props {
  saveAction?: boolean;
}

/**
 * record the user's path history hooks
 */
const usePathHistory = ({ saveAction = false }: Props) => {
  const router = useRouter();

  const pathHistoryRef = useRef<string[]>();

  useEffect(() => {
    if (saveAction) {
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

          return localStorage.setItem('pathHistory', JSON.stringify(history));
        }

        // Up to 5 path history records are allowed
        if (existPathHistory.length >= 5) {
          const history = [...existPathHistory, newPathHistory].slice(1);

          return localStorage.setItem('pathHistory', JSON.stringify(history));
        }
      }
    } else {
      const storedPathHistory = localStorage.getItem('pathHistory');

      if (storedPathHistory) {
        const existPathHistory: string[] = JSON.parse(storedPathHistory);
        pathHistoryRef.current = existPathHistory;
      }
    }
  }, [router, saveAction]);

  return { pathHistory: pathHistoryRef.current };
};

export default usePathHistory;
