import React from 'react'

import type { MediaTextBlock as MediaTextBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Reveal } from '@/components/Motion/Reveal'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export const MediaTextBlock: React.FC<MediaTextBlockProps> = ({
  eyebrow,
  media,
  imagePosition,
  richText,
  enableLink,
  link,
}) => {
  return (
    <div className="container py-14 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        <Reveal
          className={cn(
            'group relative aspect-[4/3] rounded-lg overflow-hidden',
            imagePosition === 'right' && 'md:order-2',
          )}
          direction={imagePosition === 'right' ? 'right' : 'left'}
        >
          {media && typeof media !== 'string' && (
            <Media
              resource={media}
              fill
              imgClassName="object-cover transition-opacity duration-300 group-hover:opacity-90"
              size="50vw"
            />
          )}
        </Reveal>
        <Reveal direction={imagePosition === 'right' ? 'left' : 'right'} delay={0.1}>
          {eyebrow && (
            <div className="flex items-center gap-3 mb-4">
              <span className="h-6 w-0.5 bg-accent" />
              <span className="uppercase tracking-widest text-sm font-semibold text-accent">
                {eyebrow}
              </span>
            </div>
          )}
          {richText && <RichText data={richText} enableGutter={false} />}
          {enableLink && link && (
            <div className="mt-6">
              <CMSLink appearance="default" {...link} />
            </div>
          )}
        </Reveal>
      </div>
    </div>
  )
}
