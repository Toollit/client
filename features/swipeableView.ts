import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Actions } from 'react-swipeable-views';

export interface InitialState {
  tabIndex: number;
  updateHeightAction: null | Actions['updateHeight'];
}

const initialState: InitialState = {
  tabIndex: 0,
  updateHeightAction: null,
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
    updateSwipeableViewHeight: (
      state,
      action: PayloadAction<Pick<InitialState, 'updateHeightAction'>>,
    ) => {
      const { updateHeightAction } = action.payload;
      state.updateHeightAction = updateHeightAction;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSwipeableViewState, updateSwipeableViewHeight } =
  swipeableViewSlice.actions;

export default swipeableViewSlice.reducer;
