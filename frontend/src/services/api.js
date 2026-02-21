import axios from 'axios';
import store from '../app/store';
import { logout } from '../features/auth/authSlice';

/**
 * Base API configuration for WorkFlowPro.
 * Configures Axios with interceptors for authentication and tenant headers.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor to add authentication and tenant headers.
 */
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    const tenantId = state.auth.tenantId;

    // Add Authorization header if token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add Tenant ID header if tenant exists
    if (tenantId) {
      config.headers['X-Tenant-ID'] = tenantId;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for error handling.
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - logout user
    if (error.response?.status === 401) {
      store.dispatch(logout());
      // Redirect to login page
      window.location.href = '/login';
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error('Access forbidden:', error.response.data);
    }

    // Handle 404 Not Found
    if (error.response?.status === 404) {
      console.error('Resource not found:', error.response.data);
    }

    // Handle 500 Server Error
    if (error.response?.status >= 500) {
      console.error('Server error:', error.response.data);
    }

    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error.message);
    }

    return Promise.reject(error);
  }
);

/**
 * API service methods for common operations.
 */
export const apiService = {
  /**
   * GET request
   */
  get: (url, config = {}) => api.get(url, config),

  /**
   * POST request
   */
  post: (url, data = {}, config = {}) => api.post(url, data, config),

  /**
   * PUT request
   */
  put: (url, data = {}, config = {}) => api.put(url, data, config),

  /**
   * PATCH request
   */
  patch: (url, data = {}, config = {}) => api.patch(url, data, config),

  /**
   * DELETE request
   */
  delete: (url, config = {}) => api.delete(url, config),
};

export default api;
