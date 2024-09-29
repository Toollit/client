import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  isFullScreenLoading: boolean;
  isFieldLoading: boolean;
}

const initialState: InitialState = {
  isFullScreenLoading: false,
  isFieldLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    fullScreenLoading: (state, action: PayloadAction<boolean>) => {
      const isLoading = action.payload;

      state.isFullScreenLoading = isLoading;
    },
    fieldLoading: (state, action: PayloadAction<boolean>) => {
      const isLoading = action.payload;

      state.isFieldLoading = isLoading;
    },
  },
});

// Action creators are generated for each case reducer function
export const { fullScreenLoading, fieldLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
