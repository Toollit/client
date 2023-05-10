import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import {
  autoPlay,
  virtualize,
  SlideRenderProps,
} from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const EnhancedSwipeableViews = autoPlay(virtualize(SwipeableViews));

const slideRenderer = (
  params: SlideRenderProps,
  children: React.ReactNode[],
) => {
  const { index, key } = params;

  switch (mod(index, 3)) {
    case 0:
      return <div key={key}>{children[0]}</div>;

    case 1:
      return <div key={key}>{children[1]}</div>;

    case 2:
      return <div key={key}>{children[2]}</div>;
  }
};

interface SwipeableViewProps {
  children: React.ReactNode[];
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
      <EnhancedSwipeableViews
        slideRenderer={(renderer) => slideRenderer(renderer, children)}
        enableMouseEvents
        autoPlay={autoPlay}
        interval={interval ?? 4000}
      />
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
