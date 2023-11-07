import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
  tabIndex: number;
  needUpdateViewHeight: boolean;
}

const initialState: InitialState = {
  tabIndex: 0,
  needUpdateViewHeight: false,
};

const swipeableViewSlice = createSlice({
  name: 'swipeableView',
  initialState,
  reducers: {
    updateSwipeableViewState: (
      state,
      action: PayloadAction<Pick<InitialState, 'tabIndex'>>,
    ) => {
      const { tabIndex } = action.payload;
      state.tabIndex = tabIndex;
    },
    swipeableViewHeight: (
      state,
      action: PayloadAction<Pick<InitialState, 'needUpdateViewHeight'>>,
    ) => {
      const { needUpdateViewHeight } = action.payload;
      state.needUpdateViewHeight = needUpdateViewHeight;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSwipeableViewState, swipeableViewHeight } =
  swipeableViewSlice.actions;

export default swipeableViewSlice.reducer;
