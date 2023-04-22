import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface DrawerAction {
  type: 'search';
}

export interface DrawerState {
  search: boolean;
}

const initialState: DrawerState = {
  search: false,
};

const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    openDrawer: (state, action: PayloadAction<DrawerAction>) => {
      switch (action.payload.type) {
        case 'search':
          state.search = true;
          break;

        default:
          break;
      }
    },
    closeDrawer: (state, action: PayloadAction<DrawerAction>) => {
      switch (action.payload.type) {
        case 'search':
          state.search = false;
          break;

        default:
          break;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { openDrawer, closeDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
