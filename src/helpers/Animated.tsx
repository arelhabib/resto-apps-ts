import { motion } from 'framer-motion'
import React from 'react'

interface AnimatedProps {
  children: React.ReactNode,
  transition?: string
}

const Animated: React.FC<AnimatedProps> = (props) => {
  return (
    <>
      {props.transition === "up" ?
        <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          {props.children}
        </motion.div>
        :
        <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, delay: 0.1 }}>
          {props.children}
        </motion.div>}
    </>
  )
}

export default Animated