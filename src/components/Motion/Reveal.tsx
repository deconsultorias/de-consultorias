'use client'

import React from 'react'
import { motion } from 'motion/react'

import { cn } from '@/utilities/ui'

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none'

const offsets: Record<RevealDirection, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
}

export const Reveal: React.FC<{
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: RevealDirection
  as?: 'div' | 'section' | 'span'
}> = ({ children, className, delay = 0, direction = 'up', as = 'div' }) => {
  const MotionTag = motion[as]

  return (
    <MotionTag
      className={cn(className)}
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}
