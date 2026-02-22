import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'
import projectSlice from '../features/projects/projectSlice'
import taskSlice from '../features/tasks/taskSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    projects: projectSlice,
    tasks: taskSlice,
  },
})

export default store
