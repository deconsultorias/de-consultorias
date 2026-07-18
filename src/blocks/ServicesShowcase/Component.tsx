import type { Service, ServicesShowcaseBlock as ServicesShowcaseBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CMSLink } from '@/components/Link'
import { HighlightedText } from '@/components/HighlightedText'
import { ServicesGrid } from '@/components/ServicesGrid'

export const ServicesShowcaseBlock: React.FC<
  ServicesShowcaseBlockProps & {
    id?: string
  }
> = async (props) => {
  const {
    id,
    eyebrow,
    title,
    titleHighlight,
    introContent,
    limit: limitFromProps,
    populateBy,
    selectedDocs,
    viewAllLink,
  } = props

  const limit = limitFromProps || 6

  let services: Service[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const fetchedServices = await payload.find({
      collection: 'services',
      depth: 1,
      limit,
      sort: 'order',
    })

    services = fetchedServices.docs
  } else if (selectedDocs?.length) {
    services = selectedDocs
      .map((service) => (typeof service === 'object' ? service : null))
      .filter((service): service is Service => service !== null)
  }

  return (
    <div className="py-14 md:py-20" id={`block-${id}`}>
      {(eyebrow || title || introContent || viewAllLink) && (
        <div className="container mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {eyebrow && (
              <p className="uppercase tracking-widest text-sm text-accent mb-3">{eyebrow}</p>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                <HighlightedText highlight={titleHighlight} text={title} />
              </h2>
            )}
            {introContent && (
              <RichText
                className="ms-0 mb-0 mt-3 max-w-[42rem] [&_strong]:text-accent"
                data={introContent}
                enableGutter={false}
              />
            )}
          </div>
          {viewAllLink && (
            <CMSLink appearance="link" className="shrink-0 font-semibold" {...viewAllLink} />
          )}
        </div>
      )}
      <ServicesGrid services={services} />
    </div>
  )
}
