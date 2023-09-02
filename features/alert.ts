import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AlertState {
  show: boolean;
  type: 'error' | 'warning' | 'info' | 'success' | null;
  text: string;
}

const initialState: AlertState = {
  show: false,
  type: null,
  text: '',
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: PayloadAction<Omit<AlertState, 'show'>>) => {
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
