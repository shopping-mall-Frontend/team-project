import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';
import productSlice from './slices/productSlice';
import { logger } from 'redux-logger';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  product: productSlice.reducer,
});

const initialState = {};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: initialState,
});
