import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const { mode } = useSelector((state) => state.theme)
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Projects', path: '/projects', icon: '📁' },
    { name: 'Tasks', path: '/tasks', icon: '✅' }
  ]

  return (
    <motion.aside 
      className="w-64 bg-card-bg border-r border-border-color min-h-screen p-4"
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-2">
        {menuItems.map((item) => (
          <motion.button
            key={item.name}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-300 ${
              location.pathname === item.path
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'hover:bg-secondary text-primary'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(item.path)}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </motion.button>
        ))}
      </div>
    </motion.aside>
  )
}

export default Sidebar
