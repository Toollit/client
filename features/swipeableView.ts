import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SwipeableViewState {
  index: number;
  type: 'move' | 'end';
}

const initialState: SwipeableViewState = {
  index: 0,
  type: 'end',
};

const swipeableViewSlice = createSlice({
  name: 'swipeableView',
  initialState,
  reducers: {
    updateSwipeableViewState: (
      state,
      action: PayloadAction<SwipeableViewState>,
    ) => {
      const { index, type } = action.payload;

      state.index = index;
      state.type = type;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateSwipeableViewState } = swipeableViewSlice.actions;

export default swipeableViewSlice.reducer;
