import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface DialogState {
  type: 'standard' | 'multiline' | 'select';
  open: boolean;
  title: string;
  value: string;
  newValue: string;
  maxLength?: number;
}

const initialState: DialogState = {
  type: 'standard',
  open: false,
  title: '',
  value: '',
  newValue: '',
  maxLength: 0,
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    open: (state, action: PayloadAction<Omit<DialogState, 'newValue'>>) => {
      const { type, open, title, maxLength, value } = action.payload;
      state.type = type;
      state.open = open;
      state.title = title;
      state.maxLength = maxLength;
      state.value = value;
    },
    close: (state) => {
      state.open = false;
    },
    updateValue: (
      state,
      action: PayloadAction<Pick<DialogState, 'newValue'>>,
    ) => {
      const { newValue } = action.payload;
      state.newValue = newValue;
    },
  },
});

// Action creators are generated for each case reducer function
export const { open, close, updateValue } = dialogSlice.actions;

export default dialogSlice.reducer;
