import type { Metadata } from 'next/types'

import { ServicesGrid } from '@/components/ServicesGrid'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const services = await payload.find({
    collection: 'services',
    depth: 1,
    limit: 100,
    overrideAccess: false,
    sort: 'order',
    select: {
      title: true,
      slug: true,
      area: true,
      summary: true,
      coverImage: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Servicios</h1>
          <p>
            Consultoría, capacitación y relatoría para desarrollar habilidades y obtener mejores
            resultados en seguridad, calidad, productividad y clima laboral.
          </p>
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
