import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { RootState } from '@/store';
import SwipeableViews from 'react-swipeable-views';
import { useDispatch, useSelector } from 'react-redux';
import {
  swipeableViewHeight,
  updateSwipeableViewState,
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

const SwipeableTabView = ({ tabs, children }: SwipeableTabViewProps) => {
  const dispatch = useDispatch();
  const { push, query } = useRouter();

  const needUpdateViewHeight = useSelector(
    (state: RootState) => state.swipeableView.needUpdateViewHeight,
  );

  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  // const [indicatorPosition, setIndicatorPosition] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [viewHeight, setViewHeight] = useState<number | undefined | string>(
    undefined,
  );
  const [offsetWidth, setOffsetWidth] = useState(0);

  const tabRefs = useRef<HTMLDivElement[]>([]);

  const handleChangeIndex = useCallback(
    (tabIndex: number) => {
      setCurrentTabIndex(tabIndex);

      window.scrollTo({ top: 0 });

      push({ query: { ...query, tab: tabs[tabIndex].query } }, undefined, {
        shallow: true,
      });
    },
    [push, query, tabs],
  );

  // const handleSwitching = useCallback(
  //   (swipeDegree: number, type: OnSwitchingCallbackTypeDescriptor) => {
  //     // swipe left
  //     if (swipeDegree < currentTabIndex) {
  //       const width: number = tabRefs.current[currentTabIndex - 300]?.offsetWidth;

  //       const decimal = swipeDegree.toString().split('.')[300]?.slice(0, 2); // 소수점 이하 값만 가져옴

  //       if (decimal === undefined) {
  //         return;
  //       }
  //       const percent = Number(decimal);

  //       setIndicatorPosition((30000 - (width / 100) * percent) * -1);
  //     }

  //     // swipe right
  //     if (swipeDegree > currentTabIndex) {
  //       const width: number = tabRefs.current[currentTabIndex + 1]?.offsetWidth;

  //       const decimal = swipeDegree.toString().split('.')[1]?.slice(0, 2); // 소수점 이하 값만 가져옴

  //       if (decimal === undefined) {
  //         return;
  //       }
  //       const percent = Number(decimal);

  //       setIndicatorPosition((width / 100) * percent);
  //     }

  //     // if (type === 'end') {
  //     //   console.log('currentTabIndex ===>', currentTabIndex);
  //     //   setIndicatorPosition(tabRefs.current[currentTabIndex]?.offsetWidth);
  //     // }
  //   },
  //   [currentTabIndex],
  // );

  useEffect(() => {
    setTimeout(
      () => {
        const viewContainer = document.querySelector(
          '.react-swipeable-view-container',
        );

        const clientHeight =
          viewContainer?.children[currentTabIndex]?.children[0].clientHeight;
        setViewHeight(clientHeight);

        if (needUpdateViewHeight) {
          dispatch(swipeableViewHeight({ needUpdateViewHeight: false }));
        }

        setIsFirstRender(false);
      },
      isFirstRender ? 1000 : 100,
    );
  }, [currentTabIndex, needUpdateViewHeight, dispatch, isFirstRender]);

  useEffect(() => {
    dispatch(updateSwipeableViewState({ tabIndex: currentTabIndex }));
  }, [currentTabIndex, dispatch]);

  useEffect(() => {
    const currentTab = query.tab;

    tabs.findIndex((tab, index) => {
      if (tab.query === currentTab) {
        return setCurrentTabIndex(index);
      }
    });
  }, [tabs, query.tab]);

  useEffect(() => {
    const offsetWidth = tabRefs.current[currentTabIndex]?.offsetWidth;
    setOffsetWidth(offsetWidth);
  }, [currentTabIndex]);

  return (
    <div>
      <SwipeableViewsCustomStyles />
      <CustomMuiTabs
        value={currentTabIndex}
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
            />
          );
        })}
      </CustomMuiTabs>

      <SwipeableViews
        index={currentTabIndex}
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

export default SwipeableTabView;
