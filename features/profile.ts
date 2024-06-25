import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  tab: 'viewProfile' | 'viewProjects' | 'viewBookmarks' | 'viewNotifications';
}

const initialState: InitialState = {
  tab: 'viewProfile',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfileTab: (
      state,
      action: PayloadAction<Pick<InitialState, 'tab'>>,
    ) => {
      const { tab } = action.payload;
      state.tab = tab;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateProfileTab } = profileSlice.actions;

export default profileSlice.reducer;
