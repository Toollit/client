import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import userSlice from 'features/user';
import signUpSlice from '@/features/signUp';
import drawerSlice from '@/features/drawer';
import swipeableViewSlice from '@/features/swipeableView';
import dialogSlice from '@/features/dialog';
import paginationSlice from '@/features/pagination';
import postOrderSlice from '@/features/order';
import isLoadingSlice from '@/features/loading';
import alertSlice from '@/features/alert';
import reportSlice from '@/features/report';

const isDev = process.env.NODE_ENV !== 'production';

const makeStore = () => {
  const store = configureStore({
    reducer: {
      user: userSlice,
      signUp: signUpSlice,
      drawer: drawerSlice,
      swipeableView: swipeableViewSlice,
      dialog: dialogSlice,
      pagination: paginationSlice,
      postOrder: postOrderSlice,
      isLoading: isLoadingSlice,
      alert: alertSlice,
      report: reportSlice,
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

export default store;
