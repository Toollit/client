import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
  tab: {
    currentIndex: number;
  };
  view: {
    needUpdateHeight: boolean;
  };
}

const initialState: InitialState = {
  tab: {
    currentIndex: 0,
  },
  view: {
    needUpdateHeight: false,
  },
};

const updateSwipeableViewHeight = createAsyncThunk(
  'swipeableView/updateHeight',
  async (needUpdateHeight: boolean) => {
    await new Promise((resolve) => setTimeout(resolve, 100));

    return { needUpdateHeight };
  },
);

const swipeableViewSlice = createSlice({
  name: 'swipeableView',
  initialState,
  reducers: {
    swipeableViewTab: (
      state,
      action: PayloadAction<Pick<InitialState['tab'], 'currentIndex'>>,
    ) => {
      const { currentIndex } = action.payload;
      state.tab.currentIndex = currentIndex;
    },
  },
  extraReducers(builder) {
    builder.addCase(updateSwipeableViewHeight.fulfilled, (state, action) => {
      const { needUpdateHeight } = action.payload;
      state.view.needUpdateHeight = needUpdateHeight;
    });
  },
});

// Action creators are generated for each case reducer function
export const { swipeableViewTab } = swipeableViewSlice.actions;

export { updateSwipeableViewHeight };

export default swipeableViewSlice.reducer;
