import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { setColor } from '../theme/themeSlice'
import { themes } from '../theme/themes'

const ColorPicker = () => {
  const { color } = useSelector((state) => state.theme)
  const dispatch = useDispatch()

  const colors = Object.keys(themes)

  return (
    <div className="flex gap-2 p-2 bg-card-bg rounded-lg border border-border-color overflow-x-auto">
      {colors.map((themeColor) => (
        <motion.button
          key={themeColor}
          className={`w-8 h-8 rounded-full flex-shrink-0 border-2 transition-all duration-300 ${
            color === themeColor ? 'border-white scale-110' : 'border-transparent'
          }`}
          style={{ backgroundColor: themes[themeColor] }}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => dispatch(setColor(themeColor))}
        />
      ))}
    </div>
  )
}

export default ColorPicker
