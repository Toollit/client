import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
  tab: 'viewProfile' | 'viewProjects' | 'viewBookmarks' | 'viewNotifications';
  userNickname: string;
  hasRenderedViewProfile: boolean;
  hasRenderedViewProjects: boolean;
  hasRenderedViewBookmarks: boolean;
  hasRenderedViewNotifications: boolean;
}

const initialState: InitialState = {
  tab: 'viewProfile',
  userNickname: '',
  hasRenderedViewProfile: false,
  hasRenderedViewProjects: false,
  hasRenderedViewBookmarks: false,
  hasRenderedViewNotifications: false,
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
      switch (tab) {
        case 'viewProfile':
          state.hasRenderedViewProfile = true;
          break;
        case 'viewProjects':
          state.hasRenderedViewProjects = true;
          break;
        case 'viewBookmarks':
          state.hasRenderedViewBookmarks = true;
          break;
        case 'viewNotifications':
          state.hasRenderedViewNotifications = true;
          break;
        default:
          break;
      }
    },
    updateProfileNickname: (
      state,
      action: PayloadAction<Pick<InitialState, 'userNickname'>>,
    ) => {
      const { userNickname } = action.payload;
      state.userNickname = userNickname;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateProfileTab, updateProfileNickname } = profileSlice.actions;

export default profileSlice.reducer;
