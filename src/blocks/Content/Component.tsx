import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'
import { Reveal } from '@/components/Motion/Reveal'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { eyebrow, columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container py-14 md:py-20">
      {eyebrow && (
        <Reveal>
          <p className="uppercase tracking-widest text-sm text-accent mb-3">{eyebrow}</p>
        </Reveal>
      )}
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col

            return (
              <div
                className={cn(`col-span-4 lg:col-span-${colsSpanClasses[size!]}`, {
                  'md:col-span-2': size !== 'full',
                })}
                key={index}
              >
                {richText && (
                  <RichText
                    className="[&_h1]:mb-6 [&_h2]:mb-6 [&_p]:mb-6 [&_p:last-child]:mb-0"
                    data={richText}
                    enableGutter={false}
                  />
                )}

                {enableLink && <CMSLink {...link} />}
              </div>
            )
          })}
      </div>
    </div>
  )
}
