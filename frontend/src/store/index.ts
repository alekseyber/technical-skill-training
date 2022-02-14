import { configureStore, combineReducers } from '@reduxjs/toolkit';
import reducers from './reducers';
import { AuthActionCreators } from './reducers/auth/action-creators';

const rootReducer = combineReducers(reducers);

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type GetState = () => RootState;

export const logoutUser = () => {
  store.dispatch(AuthActionCreators.logout());
};

export const getAuthToken = () => {
  const { user, token } = store.getState().auth;
  if (user?.tokenType && token?.access_token) {
    return `${user.tokenType} ${token?.access_token}`;
  }
  return '';
};
