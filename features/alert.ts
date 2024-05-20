import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  show: boolean;
  type: 'error' | 'warning' | 'info' | 'success' | null;
  text: string;
}

const initialState: InitialState = {
  show: false,
  type: null,
  text: '',
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<Omit<InitialState, 'show'>>) => {
      const { type, text } = action.payload;
      state.show = true;
      state.type = type;
      state.text = text;
    },
    hideAlert: (state) => {
      state.show = false;
      state.type = null;
      state.text = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;
