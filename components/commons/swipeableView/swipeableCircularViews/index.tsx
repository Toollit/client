import React, { useCallback, useEffect, useState, useRef } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { virtualize, SlideRenderProps } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';

// react-swipeable-views-utils autoPlay props error occur
const EnhancedSwipeableViews = virtualize(SwipeableViews);

interface SwipeableViewProps {
  children: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
}

/**
 * infinite circular swipeable views
 */
const SwipeableCircularViews = ({
  children,
  autoPlay = false,
  interval = 4000,
}: SwipeableViewProps) => {
  const [viewIndex, setViewIndex] = useState(0);

  const slideRenderer = useCallback(
    (params: SlideRenderProps, children: React.ReactNode[]) => {
      const { index, key } = params;

      switch (mod(index, children.length)) {
        case 0:
          return <div key={key}>{children[0]}</div>;

        case 1:
          return <div key={key}>{children[1]}</div>;

        case 2:
          return <div key={key}>{children[2]}</div>;
      }
    },
    [],
  );

  const intervalIdRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    if (autoPlay) {
      const intervalId = setInterval(() => {
        setViewIndex((prev) => prev + 1);
      }, interval);

      intervalIdRef.current = intervalId;

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [viewIndex, interval, autoPlay]);

  return (
    <EnhancedSwipeableViews
      slideRenderer={(renderer) => slideRenderer(renderer, children)}
      enableMouseEvents
      index={viewIndex}
      onChangeIndex={(index) => {
        clearInterval(intervalIdRef.current);
        setViewIndex(index);
      }}
    />
  );
};

export default SwipeableCircularViews;
