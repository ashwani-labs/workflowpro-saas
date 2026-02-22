import { createSlice } from '@reduxjs/toolkit'

const tokenFromStorage = localStorage.getItem('wfp_token')
const userFromStorage = localStorage.getItem('wfp_user')

const initialState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  token: tokenFromStorage || null,
  isAuthenticated: Boolean(tokenFromStorage),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, token } = action.payload || {}
      state.user = user || null
      state.token = token || null
      state.isAuthenticated = Boolean(token)
      if (token) localStorage.setItem('wfp_token', token)
      if (user) localStorage.setItem('wfp_user', JSON.stringify(user))
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('wfp_token')
      localStorage.removeItem('wfp_user')
    },
    setUser: (state, action) => {
      state.user = action.payload
      localStorage.setItem('wfp_user', JSON.stringify(action.payload))
    },
  },
})

export const { login, logout, setUser } = authSlice.actions
export default authSlice.reducer
