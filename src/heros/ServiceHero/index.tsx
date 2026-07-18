'use client'

import React from 'react'
import { motion } from 'motion/react'

import type { Service } from '@/payload-types'

import { Media } from '@/components/Media'

const areaLabels: Record<string, string> = {
  'cultura-preventiva': 'Cultura Preventiva',
  'liderazgo-adaptativo': 'Liderazgo Adaptativo',
  'aprendizaje-organizacional': 'Aprendizaje Organizacional',
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

export const ServiceHero: React.FC<{
  service: Service
}> = ({ service }) => {
  const { area, coverImage, title } = service

  return (
    <div className="relative -mt-[10.4rem] flex items-end">
      <motion.div
        className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          {area && (
            <motion.div className="uppercase text-sm mb-6" variants={item}>
              {areaLabels[area] ?? area}
            </motion.div>
          )}
          <motion.h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl" variants={item}>
            {title}
          </motion.h1>
        </div>
      </motion.div>
      <div className="min-h-[60vh] select-none overflow-hidden">
        {coverImage && typeof coverImage !== 'string' && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <Media fill priority imgClassName="-z-10 object-cover" resource={coverImage} />
          </motion.div>
        )}
        <div className="absolute inset-0 pointer-events-none bg-black/25" />
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-3/4 bg-linear-to-t from-black/90 via-black/55 to-transparent" />
      </div>
    </div>
  )
}
