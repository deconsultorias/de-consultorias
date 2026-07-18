import React from 'react'

import type { FlagshipBannerBlock as FlagshipBannerBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { Reveal } from '@/components/Motion/Reveal'

export const FlagshipBannerBlock: React.FC<FlagshipBannerBlockProps> = ({
  media,
  eyebrow,
  title,
  description,
  steps,
  link,
}) => {
  return (
    <div className="container py-14 md:py-20">
      <section className="group relative overflow-hidden rounded-2xl">
        <div className="relative min-h-[26rem] flex items-end">
          {media && typeof media !== 'string' && (
            <Media
              resource={media}
              fill
              imgClassName="object-cover transition-opacity duration-300 group-hover:opacity-90"
              priority={false}
            />
          )}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-x-0 bottom-0 h-4/5 bg-linear-to-t from-black/90 via-black/60 to-transparent" />

          <Reveal className="relative z-10 p-8 md:p-12 text-white w-full">
            {eyebrow && (
              <p className="uppercase tracking-widest text-sm text-accent mb-3">{eyebrow}</p>
            )}
            <h2 className="text-2xl md:text-4xl font-semibold mb-4 max-w-xl">{title}</h2>
            {description && <p className="max-w-lg text-white/75 mb-6">{description}</p>}

            {link && (
              <div className="mb-8">
                <CMSLink appearance="default" {...link} />
              </div>
            )}

            {steps && steps.length > 0 && (
              <div className="flex flex-wrap items-center gap-x-2 gap-y-4">
                {steps.map((step, index) => (
                  <React.Fragment key={index}>
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                      <span className="text-sm whitespace-nowrap">{step.label}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <span className="hidden sm:block w-8 h-px bg-white/30 mx-1" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  )
}
