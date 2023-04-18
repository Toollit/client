import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SignUpState {
  email: string;
  password: string;
  authNums?: string;
}

const initialState: SignUpState = {
  email: '',
  password: '',
  authNums: '',
};

const signUpSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    emailAuth: (
      state,
      action: PayloadAction<Omit<SignUpState, 'authNums'>>,
    ) => {
      const { email, password } = action.payload;
      state.email = email;
      state.password = password;
    },
    updateAuthNums: (
      state,
      action: PayloadAction<Pick<SignUpState, 'authNums'>>,
    ) => {
      state.authNums = action.payload.authNums;
    },
    resetAuth: (state) => {
      state.email = '';
      state.password = '';
      state.authNums = '';
    },
  },
});

// Action creators are generated for each case reducer function
export const { emailAuth, updateAuthNums, resetAuth } = signUpSlice.actions;

export default signUpSlice.reducer;
