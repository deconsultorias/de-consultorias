'use client'

import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'
import { motion } from 'motion/react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import { cn } from '@/utilities/ui'

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

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''
  const hasImage = heroImage && typeof heroImage !== 'string'

  return (
    <div className={cn('relative flex items-end', hasImage ? '-mt-[10.4rem]' : 'pt-16')}>
      <motion.div
        className={cn(
          'container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] pb-8',
          hasImage ? 'text-white' : 'text-foreground',
        )}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <motion.div className="uppercase text-sm mb-6" variants={item}>
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Sin categoría'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </motion.div>

          <motion.div variants={item}>
            <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl">{title}</h1>
          </motion.div>

          <motion.div className="flex flex-col md:flex-row gap-4 md:gap-16" variants={item}>
            {hasAuthors && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm">Autor</p>

                  <p>{formatAuthors(populatedAuthors)}</p>
                </div>
              </div>
            )}
            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className="text-sm">Fecha de publicación</p>

                <time dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
      {hasImage && (
        <div className="min-h-[80vh] select-none overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9 }}
          >
            <Media fill priority imgClassName="-z-10 object-cover" resource={heroImage} />
          </motion.div>
          <div className="absolute inset-0 pointer-events-none bg-black/25" />
          <div className="absolute pointer-events-none left-0 bottom-0 w-full h-3/4 bg-linear-to-t from-black/90 via-black/55 to-transparent" />
        </div>
      )}
    </div>
  )
}
