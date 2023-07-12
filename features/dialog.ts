import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface DialogState {
  open: boolean;
  page: string;
  type: 'standard' | 'multiline' | 'select' | 'multiSelect' | 'hashtag' | null;
  category: string;
  title: string;
  value: string;
  placeholder?: string;
  maxLength?: number | null;
  selectList?: string[] | null;
  update: { category: string; newValue: string } | null;
}

const initialState: DialogState = {
  open: false, // dialog open
  page: '', // dialog open page or update page
  type: null, // dialog type
  category: '', // update data category
  title: '', // dialog title
  value: '', // dialog value
  placeholder: '',
  maxLength: null,
  selectList: null, //  selectList required if dialog type is 'select' or 'multiSelect'
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
      const {
        page,
        type,
        category,
        title,
        value,
        placeholder,
        maxLength,
        selectList,
      } = action.payload;
      state.open = true;
      state.page = page;
      state.type = type;
      state.category = category;
      state.title = title;
      state.value = value;
      state.placeholder = placeholder;
      state.maxLength = maxLength ?? null;
      state.selectList = selectList ? selectList : null;
    },
    close: (state) => {
      state.open = false;
      state.page = '';
      state.type = null;
      state.category = '';
      state.title = '';
      state.value = '';
      state.placeholder = '';
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
