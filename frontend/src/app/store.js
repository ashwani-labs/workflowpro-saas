import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

/**
 * Redux store configuration for WorkFlowPro.
 * Configures store with auth reducer and Redux DevTools.
 */
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: import.meta.env.DEV,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export default store;
