import { createSlice } from '@reduxjs/toolkit';

/**
 * Initial state for authentication.
 */
const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  tenantId: localStorage.getItem('tenantId') || null,
  isAuthenticated: !!localStorage.getItem('token'),
};

/**
 * Auth slice for managing authentication state.
 * Handles user credentials, token, and tenant ID with localStorage persistence.
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Sets user credentials and updates authentication state.
     * Persists token and tenantId to localStorage.
     */
    setCredentials: (state, action) => {
      const { user, token, tenantId } = action.payload;
      state.user = user;
      state.token = token;
      state.tenantId = tenantId;
      state.isAuthenticated = true;
      
      // Persist to localStorage
      if (token) {
        localStorage.setItem('token', token);
      }
      if (tenantId) {
        localStorage.setItem('tenantId', tenantId);
      }
    },
    
    /**
     * Logs out user and clears authentication state.
     * Removes token and tenantId from localStorage.
     */
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.tenantId = null;
      state.isAuthenticated = false;
      
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('tenantId');
    },
    
    /**
     * Updates user information without changing auth state.
     */
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { setCredentials, logout, updateUser } = authSlice.actions;

/**
 * Selectors for auth state.
 */
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectTenantId = (state) => state.auth.tenantId;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
