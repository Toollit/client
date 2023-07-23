import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
  tabIndex: number;
}

const initialState: InitialState = {
  tabIndex: 0,
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
  },
});

// Action creators are generated for each case reducer function
export const { updateSwipeableViewState } = swipeableViewSlice.actions;

export default swipeableViewSlice.reducer;
