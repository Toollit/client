import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SignUpState {
  email: string;
  password: string;
}

const initialState: SignUpState = {
  email: '',
  password: '',
};

const signUpSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    emailAuth: (state, action: PayloadAction<SignUpState>) => {
      const { email, password } = action.payload;
      state.email = email;
      state.password = password;
    },
  },
});

// Action creators are generated for each case reducer function
export const { emailAuth } = signUpSlice.actions;

export default signUpSlice.reducer;
