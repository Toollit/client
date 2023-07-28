import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface LoadingState {
  status: boolean;
}

const initialState: LoadingState = {
  status: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    loading: (state, action: PayloadAction<LoadingState>) => {
      const { status } = action.payload;

      state.status = status;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loading } = loadingSlice.actions;

export default loadingSlice.reducer;
