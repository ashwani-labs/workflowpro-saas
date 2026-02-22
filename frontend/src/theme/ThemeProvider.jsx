import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setColor, setTheme } from './themeSlice'

const ThemeProvider = ({ children }) => {
  const dispatch = useDispatch()
  const { mode, color } = useSelector((state) => state.theme)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const savedColor = localStorage.getItem('color')

    if (savedTheme) {
      dispatch(setTheme(savedTheme))
    }
    if (savedColor) {
      dispatch(setColor(savedColor))
    }
  }, [dispatch])

  useEffect(() => {
    localStorage.setItem('theme', mode)
    document.documentElement.setAttribute('data-theme', mode)
  }, [mode])

  useEffect(() => {
    localStorage.setItem('color', color)
    document.documentElement.setAttribute('data-color', color)
  }, [color])

  return children
}

export default ThemeProvider
