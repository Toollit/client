import React, { useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';

interface ScrollRef {
  position: { x: number; y: number };
  page: null | string;
  needRestore: boolean;
}

/**
 * Custom hook to save and restore scroll position
 */
const useScrollPosition = () => {
  const router = useRouter();

  const scrollRef = useRef<ScrollRef>({
    position: { x: 0, y: 0 },
    page: null,
    needRestore: false,
  });

  // Function to check need to restore scroll position to local storage
  const needRestoreScrollPosition = useCallback((needRestore: boolean) => {
    const storedScrollPosition = localStorage.getItem('scrollPosition');

    if (storedScrollPosition) {
      const { position, page }: ScrollRef = JSON.parse(storedScrollPosition);

      const data = { position, page, needRestore };

      localStorage.setItem('scrollPosition', JSON.stringify(data));
    }
  }, []);

  // Function to reset the current scroll position to local storage
  const resetScrollPosition = useCallback(() => {
    localStorage.setItem(
      'scrollPosition',
      JSON.stringify({
        position: { x: 0, y: 0 },
        page: null,
        needRestore: false,
      }),
    );
  }, []);

  // Function to save the current scroll position to local storage
  const saveScrollPosition = useCallback(() => {
    const data = {
      position: scrollRef.current.position,
      page: router.asPath,
      needRestore: false,
    };

    localStorage.setItem('scrollPosition', JSON.stringify(data));
  }, [router]);

  // Function to restore the scroll position from local storage
  const restoreScrollPosition = useCallback(() => {
    const storedScrollPosition = localStorage.getItem('scrollPosition');

    const currentPage = router.asPath;

    if (storedScrollPosition) {
      const { position, page, needRestore }: ScrollRef =
        JSON.parse(storedScrollPosition);

      if (position && page === currentPage && needRestore) {
        window.scrollTo(position.x, position.y);

        resetScrollPosition();
      }
    }
  }, [router, resetScrollPosition]);

  useEffect(() => {
    // Add event listener to save the scroll position on scroll
    const handleScroll = () => {
      scrollRef.current.position = {
        x: window.scrollX || document.documentElement.scrollLeft,
        y: window.scrollY || document.documentElement.scrollTop,
      };
    };
    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [saveScrollPosition]);

  return {
    saveScrollPosition,
    restoreScrollPosition,
    needRestoreScrollPosition,
  };
};

export default useScrollPosition;
