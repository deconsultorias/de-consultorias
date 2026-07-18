'use client'

import React, { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'motion/react'

export const CountUp: React.FC<{
  value: string
  className?: string
}> = ({ value, className }) => {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState(value.replace(/[0-9]/g, '0'))

  const match = value.match(/(-?\d+(?:[.,]\d+)?)/)
  const number = match ? parseFloat(match[1].replace(',', '.')) : null
  const prefix = match ? value.slice(0, match.index) : ''
  const suffix = match ? value.slice((match.index ?? 0) + match[1].length) : ''
  const decimals = match && match[1].includes('.') ? match[1].split('.')[1].length : 0

  useEffect(() => {
    if (!isInView || number === null) return

    const controls = animate(0, number, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplay(`${prefix}${latest.toFixed(decimals)}${suffix}`)
      },
    })

    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView])

  return (
    <span ref={ref} className={className}>
      {number === null ? value : display}
    </span>
  )
}
