import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  page: number;
  totalPage: number;
}

const initialState: InitialState = {
  page: 1,
  totalPage: 1,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    updatePage: (state, action: PayloadAction<Pick<InitialState, 'page'>>) => {
      const { page } = action.payload;
      state.page = page;
    },

    updateTotalPage: (
      state,
      action: PayloadAction<Pick<InitialState, 'totalPage'>>,
    ) => {
      const { totalPage } = action.payload;
      state.totalPage = totalPage;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updatePage, updateTotalPage } = paginationSlice.actions;

export default paginationSlice.reducer;
