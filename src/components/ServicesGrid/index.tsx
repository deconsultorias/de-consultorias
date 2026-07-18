import { cn } from '@/utilities/ui'
import React from 'react'

import { CardServiceData, ServiceCard } from '@/components/ServiceCard'
import { StaggerGrid, StaggerItem } from '@/components/Motion/StaggerGrid'

export type Props = {
  services: CardServiceData[]
}

export const ServicesGrid: React.FC<Props> = ({ services }) => {
  if (!services || services.length === 0) {
    return (
      <div className="container">
        <p className="text-muted-foreground text-center py-16">
          Todavía no hay intervenciones para mostrar.
        </p>
      </div>
    )
  }

  return (
    <div className={cn('container')}>
      <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services?.map((service, index) => {
          if (typeof service === 'object' && service !== null) {
            return (
              <StaggerItem key={index}>
                <ServiceCard className="h-full" doc={service} />
              </StaggerItem>
            )
          }

          return null
        })}
      </StaggerGrid>
    </div>
  )
}
