import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface DialogState {
  open: boolean;
  page: string;
  type: 'standard' | 'multiline' | 'select' | null;
  category: string;
  title: string;
  value: string;
  maxLength?: number | null;
  selectList?: string[] | null;
  update: { category: string; newValue: string } | null;
}

const initialState: DialogState = {
  open: false,
  page: '',
  type: null,
  category: '',
  title: '',
  value: '',
  maxLength: null,
  selectList: null,
  update: null,
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    open: (
      state,
      action: PayloadAction<Omit<DialogState, 'open' | 'update'>>,
    ) => {
      const { page, type, category, title, maxLength, value, selectList } =
        action.payload;
      state.open = true;
      state.page = page;
      state.type = type;
      state.category = category;
      state.title = title;
      state.value = value;
      state.maxLength = maxLength ?? null;
      state.selectList = type === 'select' && selectList ? selectList : null;
    },
    close: (state) => {
      state.open = false;
      state.page = '';
      state.type = null;
      state.title = '';
      state.value = '';
      state.maxLength = null;
      state.selectList = null;
      state.update = null;
    },
    update: (state, action: PayloadAction<Pick<DialogState, 'update'>>) => {
      const { update } = action.payload;

      if (update !== null) {
        state.update = update;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { open, close, update } = dialogSlice.actions;

export default dialogSlice.reducer;
