import React, { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook to save and restore scroll position
 */
const useScrollPosition = () => {
  const scrollRef = useRef({ x: 0, y: 0 });

  // Function to reset the current scroll position to local storage
  const resetScrollPosition = useCallback(() => {
    localStorage.setItem('scrollPosition', JSON.stringify({ x: 0, y: 0 }));
  }, []);

  // Function to check need restore scroll position to local storage
  const needRestoreScrollPosition = useCallback((needRestore: boolean) => {
    localStorage.setItem(
      'needRestoreScrollPosition',
      JSON.stringify(needRestore),
    );
  }, []);

  // Function to save the current scroll position to local storage
  const saveScrollPosition = useCallback(() => {
    const { x, y } = scrollRef.current;
    localStorage.setItem('scrollPosition', JSON.stringify({ x, y }));
  }, []);

  // Function to restore the scroll position from local storage
  const restoreScrollPosition = useCallback(() => {
    const needRestoreScroll = localStorage.getItem('needRestoreScrollPosition');

    if (needRestoreScroll) {
      const isRestoreNeed = JSON.parse(needRestoreScroll);

      if (isRestoreNeed) {
        const storedPosition = localStorage.getItem('scrollPosition');

        if (storedPosition) {
          const { x, y } = JSON.parse(storedPosition);
          window.scrollTo(x, y);
        }

        resetScrollPosition();
        needRestoreScrollPosition(false);
      }
    }
  }, [needRestoreScrollPosition, resetScrollPosition]);

  useEffect(() => {
    // Add event listener to save the scroll position on scroll
    const handleScroll = () => {
      scrollRef.current = {
        x: window.scrollX || document.documentElement.scrollLeft,
        y: window.scrollY || document.documentElement.scrollTop,
      };
    };
    window.addEventListener('scroll', handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Return the function to restore scroll position
  return {
    saveScrollPosition,
    restoreScrollPosition,
    needRestoreScrollPosition,
  };
};

export default useScrollPosition;
