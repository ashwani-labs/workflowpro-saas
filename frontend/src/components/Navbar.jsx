import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { logout } from '../features/auth/authSlice.js'
import ThemeSwitcher from './ThemeSwitcher'
import ColorPicker from './ColorPicker'

const Navbar = () => {
  const user = useSelector((state) => state.auth.user)
  const { mode } = useSelector((state) => state.theme)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <motion.nav 
      className="flex items-center justify-between p-4 bg-card-bg border-b border-border-color shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          WorkFlowPro
        </h1>
      </div>
      
      <div className="flex items-center gap-4">
        <ColorPicker />
        <ThemeSwitcher />
        <div className="flex items-center gap-4">
          <span>Welcome, {user?.name || 'User'}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar
