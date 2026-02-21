import api from '../api/axios.js'
import { API_ENDPOINTS } from '../utils/constants.js'

export const authApi = {
  login: async (credentials) => {
    const response = await api.post(API_ENDPOINTS.LOGIN, credentials)
    return response.data
  },

  logout: async () => {
    const response = await api.post(API_ENDPOINTS.LOGOUT)
    return response.data
  },

  getProfile: async () => {
    const response = await api.get(API_ENDPOINTS.PROFILE)
    return response.data
  },
}
