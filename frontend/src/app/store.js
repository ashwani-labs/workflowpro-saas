import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'
import projectSlice from '../features/projects/projectSlice'
import taskSlice from '../features/tasks/taskSlice'
import themeReducer from '../theme/themeSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    projects: projectSlice,
    tasks: taskSlice,
    theme: themeReducer,
  },
})

export default store
