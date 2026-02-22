import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../theme/themeSlice'
import { Sun, Moon } from 'lucide-react'

const ThemeSwitcher = () => {
  const { mode } = useSelector((state) => state.theme)
  const dispatch = useDispatch()

  return (
    <motion.button
      className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => dispatch(toggleTheme())}
    >
      <motion.div
        key={mode}
        initial={{ rotate: -180 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 0.3 }}
      >
        {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </motion.div>
    </motion.button>
  )
}

export default ThemeSwitcher
