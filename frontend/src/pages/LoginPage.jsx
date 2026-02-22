import { motion } from 'framer-motion'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../features/auth/authSlice.js'
import BackgroundAnimation from '../animations/BackgroundAnimation'
import EmojiAnimation from '../animations/EmojiAnimation'
import FadeAnimation from '../animations/FadeAnimation'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (formData.email && formData.password) {
        const mockUser = {
          id: 1,
          name: 'John Doe',
          email: formData.email,
          role: 'USER',
        }
        const mockToken = 'mock-jwt-token'
        
        dispatch(login({ user: mockUser, token: mockToken }))
        navigate('/dashboard')
      } else {
        setError('Please fill in all fields')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      <BackgroundAnimation />
      <EmojiAnimation />
      
      <motion.div 
        className="w-1/2 flex items-center justify-center p-8"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <FadeAnimation delay={0.2}>
          <div className="text-center">
            <motion.h1 
              className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              WorkFlowPro
            </motion.h1>
            <motion.p 
              className="text-xl text-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Streamline your workflow with modern project management
            </motion.p>
          </div>
        </FadeAnimation>
      </motion.div>

      <motion.div 
        className="w-1/2 flex items-center justify-center p-8"
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <FadeAnimation delay={0.4}>
          <div className="w-full max-w-md">
            <motion.div 
              className="card p-8"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-center mb-6">Welcome Back</h2>
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full"
                    required
                  />
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </motion.button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-secondary">
                  Don't have an account? 
                  <a href="#" className="text-accent-color ml-1 hover:underline">
                    Sign up
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </FadeAnimation>
      </motion.div>
    </div>
  )
}

export default LoginPage
