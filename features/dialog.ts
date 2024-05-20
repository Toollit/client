import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
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

/**
 * @property {boolean} open - dialog open state
 * @property {string} page - page where you currently open the dialog
 * @property {string|null} type - type of dialog
 * @property {string} category - category of update data
 * @property {string} title - title of the dialog
 * @property {string} value - value in the dialog
 * @property {string} placeholder - placeholder for input field
 * @property {number | null} maxLength - maximum length for the input field
 * @property {Array | null} selectList - required if dialog type is 'select' or 'multiSelect'
 * @property {any | null} update - opened the dialog to update the information
 */
const initialState: InitialState = {
  open: false,
  page: '',
  type: null,
  category: '',
  title: '',
  value: '',
  placeholder: '',
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
      action: PayloadAction<Omit<InitialState, 'open' | 'update'>>,
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
    update: (state, action: PayloadAction<Pick<InitialState, 'update'>>) => {
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
