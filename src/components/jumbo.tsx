'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './styles.module.css'

interface PageProps {
  index: number
  gradient: string
  onClick: () => void
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1]
    }
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-30%' : '30%',
    opacity: 0,
    scale: 0.9,
    transition: { 
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1]
    }
  })
}

const Page = ({ index, gradient, onClick }: PageProps) => (
  <div className={styles.page} onClick={onClick}>
    <div className={styles.slopeBegin} />
    <div className={`${styles.slopeEnd} ${styles[gradient]}`} />
    <div className={styles.content}>
      <div className={styles.text}>
        <div className={styles.number}>
          <span>0{index + 1}</span>
        </div>
        <div className={styles.subtitle}>
          <span>Slide Title {index + 1}</span>
        </div>
      </div>
    </div>
  </div>
)

export default function App() {
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const gradients = ['pink', 'teal', 'tomato', 'purple', 'blue']

  const paginate = (newPage: number) => {
    const dir = newPage > page ? 1 : -1
    setDirection(dir)
    setIsExiting(true)
    setPage(newPage)
  }

  return (
    <div className={styles.container}>
      <AnimatePresence 
        custom={direction} 
        mode="wait"
        onExitComplete={() => setIsExiting(false)}
      >
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className={styles.motionWrapper}
          data-is-exiting={isExiting}
        >
          <Page
            index={page}
            gradient={gradients[page % gradients.length]}
            onClick={() => paginate((page + 1) % gradients.length)}
          />
        </motion.div>
      </AnimatePresence>
      
      <div className={styles.navigation}>
        {gradients.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === page ? styles.active : ''}`}
            onClick={() => paginate(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}