import { QueryClient } from '@tanstack/react-query';

/**
 * React Query client configuration for WorkFlowPro.
 * Configures caching, retries, and refetching behavior.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Enable retries for failed requests
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (except 408, 429)
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return error.response.status === 408 || error.response.status === 429 ? failureCount < 2 : false;
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      
      // Retry delay with exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Cache time - data stays fresh for 5 minutes
      staleTime: 5 * 60 * 1000,
      
      // Cache time - data stays in cache for 10 minutes
      cacheTime: 10 * 60 * 1000,
      
      // Refetch on window focus
      refetchOnWindowFocus: false,
      
      // Refetch on reconnect
      refetchOnReconnect: true,
      
      // Refetch on mount if data is stale
      refetchOnMount: true,
      
      // Error retry behavior
      throwOnError: false,
      
      // Loading time before showing loading state
      loadingDelay: 200,
    },
    mutations: {
      // Retry mutations once on failure
      retry: 1,
      
      // Don't throw errors by default
      throwOnError: false,
    },
  },
});

export default queryClient;
