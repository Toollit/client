import { createSlice } from '@reduxjs/toolkit';

interface InitialState {
  open: boolean;
}

const initialState: InitialState = {
  open: false,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    openReport: (state) => {
      state.open = true;
    },
    closeReport: (state) => {
      state.open = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openReport, closeReport } = reportSlice.actions;

export default reportSlice.reducer;
