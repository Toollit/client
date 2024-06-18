import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  email: string;
  password: string;
}

const initialState: InitialState = {
  email: '',
  password: '',
};

const signUpSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    emailAuth: (state, action: PayloadAction<InitialState>) => {
      const { email, password } = action.payload;
      state.email = email;
      state.password = password;
    },
  },
});

// Action creators are generated for each case reducer function
export const { emailAuth } = signUpSlice.actions;

export default signUpSlice.reducer;
