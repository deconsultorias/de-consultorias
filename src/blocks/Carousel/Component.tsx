'use client'
import { cn } from '@/utilities/ui'
import React, { useCallback, useEffect, useState } from 'react'

import type { CarouselBlock as CarouselBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'

export const CarouselBlock: React.FC<
  CarouselBlockProps & {
    id?: string
  }
> = ({ id, autoplayMs, slides }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const total = slides?.length ?? 0

  const goTo = useCallback(
    (index: number) => {
      if (total === 0) return
      setActiveIndex(((index % total) + total) % total)
    },
    [total],
  )

  useEffect(() => {
    if (!autoplayMs || total < 2) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % total)
    }, autoplayMs)

    return () => clearInterval(interval)
  }, [autoplayMs, total])

  if (!slides || total === 0) return null

  return (
    <div className="container py-14 md:py-20" id={`block-${id}`}>
      <div className="relative overflow-hidden rounded-lg aspect-[16/9]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={cn(
              'absolute inset-0 transition-opacity duration-700',
              index === activeIndex ? 'opacity-100' : 'opacity-0 pointer-events-none',
            )}
          >
            {slide.image && typeof slide.image !== 'string' && (
              <Media
                fill
                priority={index === 0}
                imgClassName="object-cover"
                resource={slide.image}
              />
            )}
            {slide.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-6">
                <p className="text-foreground">{slide.caption}</p>
              </div>
            )}
          </div>
        ))}

        {total > 1 && (
          <>
            <button
              aria-label="Imagen anterior"
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background text-foreground w-10 h-10 flex items-center justify-center shadow"
              onClick={() => goTo(activeIndex - 1)}
              type="button"
            >
              ‹
            </button>
            <button
              aria-label="Siguiente imagen"
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background text-foreground w-10 h-10 flex items-center justify-center shadow"
              onClick={() => goTo(activeIndex + 1)}
              type="button"
            >
              ›
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, index) => (
                <button
                  aria-label={`Ir a la imagen ${index + 1}`}
                  className={cn(
                    'w-2.5 h-2.5 rounded-full',
                    index === activeIndex ? 'bg-background' : 'bg-background/40',
                  )}
                  key={index}
                  onClick={() => goTo(index)}
                  type="button"
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
