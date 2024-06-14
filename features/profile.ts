import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  isRegisteredUser: boolean;
  userNickname: string;
  tab: 'viewProfile' | 'viewProjects' | 'viewBookmarks' | 'viewNotifications';
}

const initialState: InitialState = {
  isRegisteredUser: false,
  userNickname: '',
  tab: 'viewProfile',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    updateProfileRegisteredUserStatus: (
      state,
      action: PayloadAction<Pick<InitialState, 'isRegisteredUser'>>,
    ) => {
      const { isRegisteredUser } = action.payload;
      state.isRegisteredUser = isRegisteredUser;
    },
    updateProfileUserNickname: (
      state,
      action: PayloadAction<Pick<InitialState, 'userNickname'>>,
    ) => {
      const { userNickname } = action.payload;
      state.userNickname = userNickname;
    },
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
export const {
  updateProfileRegisteredUserStatus,
  updateProfileUserNickname,
  updateProfileTab,
} = profileSlice.actions;

export default profileSlice.reducer;
