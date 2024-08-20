import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store';
import SwipeableViews from 'react-swipeable-views';
import {
  swipeableViewTab,
  updateSwipeableViewHeight,
} from '@/features/swipeableView';
import {
  CustomMuiTabs,
  CustomMuiTab,
  SwipeableViewsCustomStyles,
} from './styles';

interface SwipeableTabViewProps {
  tabs: { name: string; query: string }[];
  children: React.ReactNode[];
}

const SwipeableTabViews = ({ tabs, children }: SwipeableTabViewProps) => {
  const dispatch = useAppDispatch();

  const { push, query } = useRouter();

  const needUpdateViewHeight = useAppSelector(
    (state) => state.swipeableView.view.needUpdateHeight,
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  // const [indicatorPosition, setIndicatorPosition] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [viewHeight, setViewHeight] = useState<number | undefined | string>(
    undefined,
  );
  const [offsetWidth, setOffsetWidth] = useState(0);

  const tabRefs = useRef<HTMLDivElement[]>([]);

  const handleChangeIndex = useCallback(
    (tabIndex: number) => {
      setCurrentIndex(tabIndex);

      // In the mobile version, the safe-area-inset size is not properly recognized.
      // This causes the mobile version to fail to move to the top end as much as the best safe-area-inset size.
      // So, give enough -100 to solve the problem of not being able to scroll to the top end.
      window.scrollTo({ top: -100 });

      push({ query: { ...query, tab: tabs[tabIndex].query } }, undefined, {
        shallow: true,
      });
    },
    [push, query, tabs],
  );

  // const handleSwitching = useCallback(
  //   (swipeDegree: number, type: OnSwitchingCallbackTypeDescriptor) => {
  //     // swipe left
  //     if (swipeDegree < currentIndex) {
  //       const width: number = tabRefs.current[currentIndex - 300]?.offsetWidth;

  //       const decimal = swipeDegree.toString().split('.')[300]?.slice(0, 2); // 소수점 이하 값만 가져옴

  //       if (decimal === undefined) {
  //         return;
  //       }
  //       const percent = Number(decimal);

  //       setIndicatorPosition((30000 - (width / 100) * percent) * -1);
  //     }

  //     // swipe right
  //     if (swipeDegree > currentIndex) {
  //       const width: number = tabRefs.current[currentIndex + 1]?.offsetWidth;

  //       const decimal = swipeDegree.toString().split('.')[1]?.slice(0, 2); // 소수점 이하 값만 가져옴

  //       if (decimal === undefined) {
  //         return;
  //       }
  //       const percent = Number(decimal);

  //       setIndicatorPosition((width / 100) * percent);
  //     }

  //     // if (type === 'end') {
  //     //   console.log('currentIndex ===>', currentIndex);
  //     //   setIndicatorPosition(tabRefs.current[currentIndex]?.offsetWidth);
  //     // }
  //   },
  //   [currentIndex],
  // );

  // After rendering the screen, it runs once and whenever the needUpdateViewHeight value changes to update the height of the view.
  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        const viewContainer = document.querySelector(
          '.react-swipeable-view-container',
        );

        const clientHeight =
          viewContainer?.children[currentIndex]?.children[0].clientHeight;

        setViewHeight(clientHeight);

        if (needUpdateViewHeight) {
          dispatch(updateSwipeableViewHeight(false));
        }

        setIsFirstRender(false);
      },
      isFirstRender ? 1000 : 100,
    );

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentIndex, needUpdateViewHeight, dispatch, isFirstRender]);

  useEffect(() => {
    dispatch(swipeableViewTab({ currentIndex }));
  }, [currentIndex, dispatch]);

  useEffect(() => {
    const currentTab = query.tab;

    tabs.findIndex((tab, index) => {
      if (tab.query === currentTab) {
        return setCurrentIndex(index);
      }
    });
  }, [tabs, query.tab]);

  useEffect(() => {
    const offsetWidth = tabRefs.current[currentIndex]?.offsetWidth;
    setOffsetWidth(offsetWidth);
  }, [currentIndex]);

  return (
    <div>
      <SwipeableViewsCustomStyles />
      <CustomMuiTabs
        value={currentIndex}
        onChange={(_, index) => handleChangeIndex(index)}
        disabled
        width={offsetWidth}
      >
        {tabs.map((tab, index) => {
          return (
            <CustomMuiTab
              key={tab.name}
              label={tab.name}
              ref={(ref) =>
                ref !== null ? (tabRefs.current[index] = ref) : null
              }
              disableRipple={true}
            />
          );
        })}
      </CustomMuiTabs>

      <SwipeableViews
        index={currentIndex}
        enableMouseEvents
        onChangeIndex={handleChangeIndex}
        containerStyle={{ height: viewHeight }}
        // onSwitching={handleSwitching}
      >
        {children}
      </SwipeableViews>
    </div>
  );
};

export default SwipeableTabViews;
