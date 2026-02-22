import React from 'react'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ThemeProvider from './theme/ThemeProvider'
import AppRoutes from './routes/AppRoutes'
import store from './app/store'
import './styles/global.css'

const queryClient = new QueryClient()

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AppRoutes />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
