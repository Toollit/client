import React, { useRef, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { CustomMuiTabs, CustomMuiTab } from './styles';

interface SwipeableTabViewProps {
  tabs: string[];
  children: React.ReactNode;
}

const SwipeableTabView = ({ tabs, children }: SwipeableTabViewProps) => {
  const [index, setIndex] = useState(0);
  const targetRef = useRef<any>([]);

  const handleChange = (event: React.SyntheticEvent, value: number) => {
    setIndex(value);
  };

  const handleChangeIndex = (index: number) => {
    setIndex(index);
  };

  return (
    <div>
      <CustomMuiTabs
        value={index}
        onChange={handleChange}
        disabled
        width={targetRef.current[index]?.offsetWidth}
      >
        {tabs.map((val, index) => {
          return (
            <CustomMuiTab
              key={val}
              label={val}
              ref={(ref) => (targetRef.current[index] = ref)}
            />
          );
        })}
      </CustomMuiTabs>

      <SwipeableViews
        index={index}
        enableMouseEvents
        onChangeIndex={handleChangeIndex}
      >
        {children}
      </SwipeableViews>
    </div>
  );
};

export default SwipeableTabView;
