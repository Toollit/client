import React, { useCallback, useEffect, useRef, useState } from 'react';
import SwipeableViews, {
  OnSwitchingCallbackTypeDescriptor,
} from 'react-swipeable-views';
import { CustomMuiTabs, CustomMuiTab } from './styles';
import { useDispatch } from 'react-redux';
import { updateSwipeableViewState } from '@/features/swipeableView';

interface SwipeableTabViewProps {
  tabs: { name: string; query: string }[];
  children: React.ReactNode;
  // tabHandler: () => void;
}

const SwipeableTabView = ({
  tabs,
  children,
}: // tabHandler,
SwipeableTabViewProps) => {
  const dispatch = useDispatch();
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const tabRefs = useRef<HTMLDivElement[]>([]);

  const [indicatorPosition, setIndicatorPosition] = useState(0);

  const handleChange = useCallback(
    (event: React.SyntheticEvent, value: number) => {
      setCurrentTabIndex(value);
    },
    [],
  );

  const handleChangeIndex = useCallback((index: number) => {
    setCurrentTabIndex(index);
  }, []);

  const handleSwitching = useCallback(
    (swipeDegree: number, type: OnSwitchingCallbackTypeDescriptor) => {
      // swipe left
      if (swipeDegree < currentTabIndex) {
        const width: number = tabRefs.current[currentTabIndex - 1]?.offsetWidth;

        const decimal = swipeDegree.toString().split('.')[1]?.slice(0, 2); // 소수점 이하 값만 가져옴

        if (decimal === undefined) {
          return;
        }
        const percent = Number(decimal);

        setIndicatorPosition((100 - (width / 100) * percent) * -1);
      }

      // swipe right
      if (swipeDegree > currentTabIndex) {
        const width: number = tabRefs.current[currentTabIndex + 1]?.offsetWidth;

        const decimal = swipeDegree.toString().split('.')[1]?.slice(0, 2); // 소수점 이하 값만 가져옴

        if (decimal === undefined) {
          return;
        }
        const percent = Number(decimal);

        setIndicatorPosition((width / 100) * percent);
      }

      // if (type === 'end') {
      //   console.log('currentTabIndex ===>', currentTabIndex);
      //   setIndicatorPosition(tabRefs.current[currentTabIndex]?.offsetWidth);
      // }
    },
    [currentTabIndex],
  );

  useEffect(() => {
    dispatch(updateSwipeableViewState({ tabIndex: currentTabIndex }));
  }, [currentTabIndex, dispatch]);

  return (
    <div>
      <CustomMuiTabs
        value={currentTabIndex}
        onChange={handleChange}
        disabled
        width={tabRefs.current[currentTabIndex]?.offsetWidth}
      >
        {tabs.map((tab, index) => {
          return (
            <CustomMuiTab
              key={tab.name}
              label={tab.name}
              ref={(ref) =>
                ref !== null ? (tabRefs.current[index] = ref) : null
              }
            />
          );
        })}
      </CustomMuiTabs>

      <SwipeableViews
        index={currentTabIndex}
        enableMouseEvents
        onChangeIndex={handleChangeIndex}
        // onSwitching={handleSwitching}
      >
        {children}
      </SwipeableViews>
    </div>
  );
};

export default SwipeableTabView;
