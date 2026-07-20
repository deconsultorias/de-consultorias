import type { Metadata } from 'next/types'

import { ServicesGrid } from '@/components/ServicesGrid'
import { getCachedGlobal } from '@/utilities/getGlobals'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const [services, servicesArchive] = await Promise.all([
    payload.find({
      collection: 'services',
      depth: 1,
      limit: 100,
      overrideAccess: false,
      sort: 'order',
      select: {
        title: true,
        slug: true,
        pilar: true,
        summary: true,
        coverImage: true,
      },
    }),
    getCachedGlobal('servicesArchive', 1)(),
  ])

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>{servicesArchive?.heading || 'Servicios'}</h1>
          {servicesArchive?.intro && <p>{servicesArchive.intro}</p>}
        </div>
      </div>

      <ServicesGrid services={services.docs} />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Servicios | DE Consultorías`,
  }
}
