import { authSlice } from "@/features/auth";
import { chatSlice } from "@/features/chats";
import { router } from "@/pages/router";
import { ThunkAction, UnknownAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { searchSlice } from "@/features/search";
import { auth, firestore } from "@/lib/firebase/init";

export const extraArgument = {
  auth,
  firestore,
  router,
};

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  chat: chatSlice.reducer,
  search: searchSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: { extraArgument } }),
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<R = void> = ThunkAction<R, RootState, typeof extraArgument, UnknownAction>;
export type ExtraArgument = typeof extraArgument;

export type ThunkApiConfig = {
  extra: ExtraArgument;
  state: RootState;
  dispatch: AppDispatch;
};

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<typeof store>();
