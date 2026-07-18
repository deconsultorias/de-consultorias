import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Reveal } from '@/components/Motion/Reveal'
import { cn } from '@/utilities/ui'

export const CallToActionBlock: React.FC<CTABlockProps> = ({
  backgroundImage,
  links,
  richText,
}) => {
  const hasImage = backgroundImage && typeof backgroundImage !== 'string'

  return (
    <div className="container py-14 md:py-20">
      <Reveal
        className={cn(
          'relative overflow-hidden rounded-2xl',
          hasImage
            ? 'grid grid-cols-1 md:grid-cols-2 bg-brand-dark text-brand-dark-foreground'
            : 'flex flex-col gap-8 md:flex-row md:justify-between md:items-center bg-card border border-border p-4',
        )}
      >
        <div
          className={cn('flex flex-col justify-center gap-8', hasImage && 'p-8 md:p-12 lg:p-16')}
        >
          <div className="max-w-[32rem]">
            {richText && (
              <RichText
                className={cn('mb-0 [&_strong]:text-accent', hasImage && 'prose-invert')}
                data={richText}
                enableGutter={false}
              />
            )}
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            {(links || []).map(({ link }, i) => {
              return <CMSLink key={i} size="lg" {...link} />
            })}
          </div>
        </div>

        {hasImage && (
          <div className="relative min-h-[16rem] md:min-h-0">
            <Media
              fill
              imgClassName="object-cover transition-opacity duration-300"
              resource={backgroundImage}
            />
            <div aria-hidden className="absolute bottom-4 right-4 grid grid-cols-4 gap-2">
              {Array.from({ length: 16 }).map((_, i) => (
                <span className="h-1.5 w-1.5 rounded-full bg-accent" key={i} />
              ))}
            </div>
          </div>
        )}
      </Reveal>
    </div>
  )
}
