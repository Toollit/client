import { combineReducers, Reducer, AnyAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import userSlice, { UserState } from 'features/user';
import signUpSlice, { SignUpState } from '@/features/signUp';
import drawerSlice, { DrawerState } from '@/features/drawer';
import swipeableViewSlice, {
  SwipeableViewState,
} from '@/features/swipeableView';
import dialogSlice, { DialogState } from '@/features/dialog';
import paginationSlice, { PaginationState } from '@/features/pagination';
import postOrderSlice, { PostOrderState } from '@/features/order';

export interface RootState {
  user: UserState;
  signUp: SignUpState;
  drawer: DrawerState;
  swipeableView: SwipeableViewState;
  dialog: DialogState;
  pagination: PaginationState;
  postOrder: PostOrderState;
}

const combineReducer = combineReducers({
  user: userSlice,
  signUp: signUpSlice,
  drawer: drawerSlice,
  swipeableView: swipeableViewSlice,
  dialog: dialogSlice,
  pagination: paginationSlice,
  postOrder: postOrderSlice,
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
