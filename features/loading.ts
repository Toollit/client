import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  status: boolean;
}

const initialState: InitialState = {
  status: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    loading: (state, action: PayloadAction<InitialState>) => {
      const { status } = action.payload;

      state.status = status;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loading } = loadingSlice.actions;

export default loadingSlice.reducer;
