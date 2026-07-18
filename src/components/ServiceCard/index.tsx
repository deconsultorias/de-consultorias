'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import type { Service } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardServiceData = Pick<Service, 'slug' | 'title' | 'summary' | 'area' | 'coverImage'>

export const ServiceCard: React.FC<{
  className?: string
  doc?: CardServiceData
}> = ({ className, doc }) => {
  const { card, link } = useClickableCard({})
  const { slug, title, summary, coverImage } = doc || {}
  const href = `/servicios/${slug}`

  return (
    <article
      className={cn(
        'group flex flex-col overflow-hidden rounded-xl bg-card text-foreground hover:cursor-pointer border border-border transition-[border-color,box-shadow,transform] duration-300 hover:border-accent/50 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {coverImage && typeof coverImage !== 'string' && (
          <Media
            resource={coverImage}
            size="25vw"
            fill
            imgClassName="object-cover transition-opacity duration-300 group-hover:opacity-90"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {title && (
          <h3 className="font-semibold text-lg mb-2">
            <Link className="not-prose" href={href} ref={link.ref}>
              {title}
            </Link>
          </h3>
        )}
        {summary && <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{summary}</p>}
        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
          Conoce más
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  )
}
