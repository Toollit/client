import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface Props {
  saveAction?: boolean;
}

/**
 * record the user's path history hooks
 */

const usePathHistory = ({ saveAction = false }: Props) => {
  const router = useRouter();

  const getPathHistory = useCallback(() => {
    const storedPathHistory = localStorage.getItem('pathHistory');
    if (!storedPathHistory) {
      return null;
    }
    const existPathHistory: string[] = JSON.parse(storedPathHistory);
    return existPathHistory;
  }, []);

  const getBeforePathHistory = useCallback(() => {
    const storedPathHistory = localStorage.getItem('pathHistory');
    if (!storedPathHistory) {
      return null;
    }
    const existPathHistory: string[] = JSON.parse(storedPathHistory);
    return existPathHistory[existPathHistory.length - 2];
  }, []);

  useEffect(() => {
    const newPathHistory = router.asPath;
    const storedPathHistory = localStorage.getItem('pathHistory');

    if (saveAction) {
      // Save the first path array if there is no path history history
      if (!storedPathHistory) {
        return localStorage.setItem(
          'pathHistory',
          JSON.stringify([newPathHistory]),
        );
      }

      // If already have a saved path history
      if (storedPathHistory) {
        const existPathHistory: string[] = JSON.parse(storedPathHistory);

        // Avoid storing duplicate path history when reloading from the same page.
        if (existPathHistory[existPathHistory.length - 1] === newPathHistory) {
          return;
        }

        // Up to 5 path history records are allowed
        if (existPathHistory.length < 5) {
          const history = [...existPathHistory, newPathHistory];

          return localStorage.setItem('pathHistory', JSON.stringify(history));
        }

        if (existPathHistory.length >= 5) {
          const history = [...existPathHistory, newPathHistory].slice(1);

          return localStorage.setItem('pathHistory', JSON.stringify(history));
        }
      }
    }
  }, [router, saveAction]);

  return { getPathHistory, getBeforePathHistory };
};

export default usePathHistory;
