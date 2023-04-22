import { combineReducers, Reducer, AnyAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import userSlice, { UserState } from 'features/user';
import signUpSlice, { SignUpState } from '@/features/signUp';
import drawerSlice, { DrawerState } from '@/features/drawer';

export interface RootState {
  user: UserState;
  signUp: SignUpState;
  drawer: DrawerState;
}

const combineReducer = combineReducers({
  user: userSlice,
  signUp: signUpSlice,
  drawer: drawerSlice,
});

export const rootReducer: Reducer<RootState, AnyAction> = (
  state: RootState | undefined,
  action: AnyAction,
) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };

    default: {
      return combineReducer(state, action);
    }
  }
};
