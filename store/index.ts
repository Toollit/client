import { configureStore, AnyAction } from '@reduxjs/toolkit';
import { ThunkDispatch } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import logger from 'redux-logger';
import signupSlice from '@/features/signup';
import swipeableViewSlice from '@/features/swipeableView';
import dialogSlice from '@/features/dialog';
import paginationSlice from '@/features/pagination';
import postOrderSlice from '@/features/order';
import loadingSlice from '@/features/loading';
import alertSlice from '@/features/alert';
import reportSlice from '@/features/report';
import profileSlice from '@/features/profile';
import tooltipSlice from '@/features/tooltip';

const isDev = process.env.NODE_ENV !== 'production';

const makeStore = () => {
  const store = configureStore({
    reducer: {
      signup: signupSlice,
      swipeableView: swipeableViewSlice,
      dialog: dialogSlice,
      pagination: paginationSlice,
      postOrder: postOrderSlice,
      loading: loadingSlice,
      alert: alertSlice,
      report: reportSlice,
      profile: profileSlice,
      tooltip: tooltipSlice,
    },
    middleware: (getDefaultMiddleware) =>
      isDev ? [...getDefaultMiddleware(), logger] : [...getDefaultMiddleware()],
    // ? getDefaultMiddleware().concat([logger])
    // : getDefaultMiddleware(),
    devTools: isDev,
  });

  return store;
};

const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

type TypedDispatch<T> = ThunkDispatch<T, any, AnyAction>;
export const useAppDispatch = () => useDispatch<TypedDispatch<RootState>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
