import { motion } from 'framer-motion'
import { useMemo } from 'react'

const emojis = ['🚀', '✨', '🔥', '💼', '📊', '⚡', '🎯', '💡']

const EmojiAnimation = () => {
  const emojiElements = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 5
    }))
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {emojiElements.map(({ id, emoji, initialX, initialY, duration, delay }) => (
        <motion.div
          key={id}
          className="absolute text-2xl opacity-20"
          style={{
            left: `${initialX}%`,
            top: `${initialY}%`,
          }}
          animate={{
            y: [-20, -100, -20],
            opacity: [0, 0.3, 0],
            rotate: [0, 360, 720],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {emoji}
        </motion.div>
      ))}
    </div>
  )
}

export default EmojiAnimation
