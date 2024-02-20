import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

interface SwipeableViewProps {
  children: React.ReactNode[];
  interval?: number;
}

/**
 * infinite circular swipeable views
 */
const SwipeableCircularViews = ({
  children,
  interval = 4000,
}: SwipeableViewProps) => {
  return (
    <AutoPlaySwipeableViews enableMouseEvents interval={interval}>
      {children}
    </AutoPlaySwipeableViews>
  );
};

export default SwipeableCircularViews;
