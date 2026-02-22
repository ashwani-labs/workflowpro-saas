import { motion } from 'framer-motion'
import { ReactNode } from 'react'

const Card = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      className={`card ${className}`}
      whileHover={hover ? { y: -4, scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

export default Card
