import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  open: boolean;
  postType: null | string;
  postId: null | number;
  writer: null | string;
  title: null | string;
}

const initialState: InitialState = {
  open: false,
  postType: null,
  postId: null,
  writer: null,
  title: null,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    openReport: (state, action: PayloadAction<Omit<InitialState, 'open'>>) => {
      const { postType, postId, writer, title } = action.payload;
      state.open = true;
      state.postType = postType;
      state.postId = postId;
      state.writer = writer;
      state.title = title;
    },
    closeReport: (state) => {
      state.open = false;
      state.postType = null;
      state.postId = null;
      state.writer = null;
      state.title = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openReport, closeReport } = reportSlice.actions;

export default reportSlice.reducer;
