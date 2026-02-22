import api from '../../api/axios.js'
import { API_ENDPOINTS } from '../../utils/constants.js'

export const taskApi = {
  getTasks: async () => {
    const response = await api.get(API_ENDPOINTS.TASKS)
    return response.data
  },

  getTaskById: async (id) => {
    const response = await api.get(API_ENDPOINTS.TASK_BY_ID(id))
    return response.data
  },

  getTasksByProject: async (projectId) => {
    const response = await api.get(API_ENDPOINTS.TASKS_BY_PROJECT(projectId))
    return response.data
  },

  createTask: async (taskData) => {
    const response = await api.post(API_ENDPOINTS.TASKS, taskData)
    return response.data
  },

  updateTask: async (id, taskData) => {
    const response = await api.put(API_ENDPOINTS.TASK_BY_ID(id), taskData)
    return response.data
  },

  deleteTask: async (id) => {
    const response = await api.delete(API_ENDPOINTS.TASK_BY_ID(id))
    return response.data
  },
}
