import { combineReducers, Reducer, AnyAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import userSlice, { UserState } from 'features/user';
import signUpSlice, { SignUpState } from '@/features/signUp';
import postSlice, { PostState } from 'features/post';

export interface RootState {
  user: UserState;
  signUp: SignUpState;
  post: PostState;
}

const combineReducer = combineReducers({
  user: userSlice,
  signUp: signUpSlice,
  post: postSlice,
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
