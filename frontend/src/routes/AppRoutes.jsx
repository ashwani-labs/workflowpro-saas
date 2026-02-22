import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import Dashboard from '../pages/Dashboard'
import Projects from '../pages/Projects'
import Tasks from '../pages/Tasks'
import MainLayout from '../layouts/MainLayout'
import ProtectedRoute from '../components/ProtectedRoute'

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="/dashboard" replace />
        },
        {
          path: 'dashboard',
          element: <Dashboard />
        },
        {
          path: 'projects',
          element: <Projects />
        },
        {
          path: 'tasks',
          element: <Tasks />
        }
      ]
    },
    {
      path: '*',
      element: <Navigate to="/dashboard" replace />
    }
  ])

  return <RouterProvider router={router} />
}

export default AppRoutes
