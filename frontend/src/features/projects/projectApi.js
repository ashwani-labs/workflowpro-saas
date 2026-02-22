import api from '../../api/axios.js'
import { API_ENDPOINTS } from '../../utils/constants.js'

export const projectApi = {
  getProjects: async () => {
    const response = await api.get(API_ENDPOINTS.PROJECTS)
    return response.data
  },

  getProjectById: async (id) => {
    const response = await api.get(API_ENDPOINTS.PROJECT_BY_ID(id))
    return response.data
  },

  createProject: async (projectData) => {
    const response = await api.post(API_ENDPOINTS.PROJECTS, projectData)
    return response.data
  },

  updateProject: async (id, projectData) => {
    const response = await api.put(API_ENDPOINTS.PROJECT_BY_ID(id), projectData)
    return response.data
  },

  deleteProject: async (id) => {
    const response = await api.delete(API_ENDPOINTS.PROJECT_BY_ID(id))
    return response.data
  },
}
