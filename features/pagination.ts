import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface PaginationState {
  page: number;
  totalPage: number;
}

const initialState: PaginationState = {
  page: 1,
  totalPage: 1,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    updatePage: (
      state,
      action: PayloadAction<Pick<PaginationState, 'page'>>,
    ) => {
      const { page } = action.payload;
      state.page = page;
    },
    resetPage: (state) => {
      state.page = 1;
    },
    updateTotalPage: (
      state,
      action: PayloadAction<Pick<PaginationState, 'totalPage'>>,
    ) => {
      const { totalPage } = action.payload;
      state.totalPage = totalPage;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updatePage, resetPage, updateTotalPage } =
  paginationSlice.actions;

export default paginationSlice.reducer;
