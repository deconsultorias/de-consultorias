'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="container py-4 md:py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
        <motion.div animate="show" className="max-w-[32rem]" initial="hidden" variants={container}>
          {richText && (
            <motion.div variants={item}>
              <RichText className="mb-6" data={richText} enableGutter={false} />
            </motion.div>
          )}
          {Array.isArray(links) && links.length > 0 && (
            <motion.ul className="flex flex-wrap gap-4" variants={item}>
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link}>
                      <ArrowRight className="h-4 w-4" />
                    </CMSLink>
                  </li>
                )
              })}
            </motion.ul>
          )}
        </motion.div>

        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
          initial={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {media && typeof media === 'object' && (
            <div className="relative aspect-4/3 overflow-hidden rounded-r-2xl rounded-l-[2rem] md:rounded-l-[5rem] lg:rounded-l-[7rem]">
              <Media fill imgClassName="object-cover" priority resource={media} />
            </div>
          )}
          <div
            aria-hidden
            className="absolute -bottom-8 -right-8 hidden sm:grid grid-cols-4 gap-2.5 -z-10"
          >
            {Array.from({ length: 16 }).map((_, i) => (
              <span className="h-2 w-2 rounded-full bg-accent" key={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
