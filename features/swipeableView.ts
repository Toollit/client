import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SwipeableViewState {
  tabIndex: number;
}

const initialState: SwipeableViewState = {
  tabIndex: 0,
};

const swipeableViewSlice = createSlice({
  name: 'swipeableView',
  initialState,
  reducers: {
    updateSwipeableViewState: (
      state,
      action: PayloadAction<SwipeableViewState>,
    ) => {
      const { tabIndex } = action.payload;
      state.tabIndex = tabIndex;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSwipeableViewState } = swipeableViewSlice.actions;

export default swipeableViewSlice.reducer;
