import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface PostOrderState {
  order: 'new' | 'popularity';
}

const initialState: PostOrderState = {
  order: 'new',
};

const postOrderSlice = createSlice({
  name: 'postOrder',
  initialState,
  reducers: {
    updatePostOrder: (state, action: PayloadAction<PostOrderState>) => {
      const { order } = action.payload;
      state.order = order;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updatePostOrder } = postOrderSlice.actions;

export default postOrderSlice.reducer;
