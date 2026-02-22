import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'

const BackgroundAnimation = () => {
  const { mode, color } = useSelector((state) => state.theme)
  
  const colors = {
    blue: ['rgba(59, 130, 246, 0.1)', 'rgba(59, 130, 246, 0.05)', 'rgba(59, 130, 246, 0.02)'],
    purple: ['rgba(139, 92, 246, 0.1)', 'rgba(139, 92, 246, 0.05)', 'rgba(139, 92, 246, 0.02)'],
    green: ['rgba(16, 185, 129, 0.1)', 'rgba(16, 185, 129, 0.05)', 'rgba(16, 185, 129, 0.02)'],
    orange: ['rgba(249, 115, 22, 0.1)', 'rgba(249, 115, 22, 0.05)', 'rgba(249, 115, 22, 0.02)'],
    red: ['rgba(239, 68, 68, 0.1)', 'rgba(239, 68, 68, 0.05)', 'rgba(239, 68, 68, 0.02)'],
    pink: ['rgba(236, 72, 153, 0.1)', 'rgba(236, 72, 153, 0.05)', 'rgba(236, 72, 153, 0.02)'],
    teal: ['rgba(20, 184, 166, 0.1)', 'rgba(20, 184, 166, 0.05)', 'rgba(20, 184, 166, 0.02)']
  }

  const currentColors = colors[color] || colors.blue

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl"
        style={{ backgroundColor: currentColors[0] }}
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl"
        style={{ backgroundColor: currentColors[1] }}
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl"
        style={{ backgroundColor: currentColors[2] }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}

export default BackgroundAnimation
