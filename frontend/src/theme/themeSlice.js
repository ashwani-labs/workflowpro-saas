import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: 'light',
  color: 'blue'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
    setTheme: (state, action) => {
      state.mode = action.payload
    },
    setColor: (state, action) => {
      state.color = action.payload
    }
  }
})

export const { toggleTheme, setTheme, setColor } = themeSlice.actions
export default themeSlice.reducer
