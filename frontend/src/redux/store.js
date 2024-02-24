import { configureStore } from '@reduxjs/toolkit';
import authReducer from './state/authSlice';
import messageReducer from './state/messageSlice';
import favsReducer from './state/favsSlice';
import themeReducer from './state/themeSlice';
import placeReducer from './state/placeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messageReducer,
    favorites: favsReducer,
    theme: themeReducer,
    placesNearby: placeReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ['auth/login', 'auth/register']
      }
    }),
});
