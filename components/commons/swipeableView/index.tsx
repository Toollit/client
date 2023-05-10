import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay, virtualize } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const EnhancedSwipeableViews = virtualize(SwipeableViews);

const styles = {
  slide: {
    padding: 15,
    minHeight: 100,
    color: '#fff',
  },
  slide1: {
    backgroundColor: '#FEA900',
    height: '100vh',
  },
  slide2: {
    backgroundColor: '#B3DC4A',
  },
  slide3: {
    backgroundColor: '#6AC0FF',
  },
};

interface SwipeableViewProps {
  children: React.ReactNode;
  autoPlay?: boolean;
  interval?: number;
}

const SwipeableView = ({
  children,
  autoPlay,
  interval,
}: SwipeableViewProps) => {
  const [viewIndex, setViewIndex] = useState(0);

  const handleChange = (event: any, value: any) => {
    console.log({ event, value });
    setViewIndex(value);
  };

  const handleChangeIndex = (index: number) => {
    setViewIndex(index);
  };

  if (autoPlay) {
    return (
      <AutoPlaySwipeableViews
        autoPlay={autoPlay}
        interval={interval}
        enableMouseEvents
      >
        {children}
      </AutoPlaySwipeableViews>
    );
  }

  return (
    <div>
      <SwipeableViews
        index={viewIndex}
        enableMouseEvents
        onChangeIndex={handleChangeIndex}
      >
        {children}
      </SwipeableViews>
    </div>
  );
};

export default SwipeableView;
