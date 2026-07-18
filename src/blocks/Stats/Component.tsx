import React from 'react'

import type { StatsBlock as StatsBlockProps } from '@/payload-types'

import { CountUp } from '@/components/Motion/CountUp'
import { StaggerGrid, StaggerItem } from '@/components/Motion/StaggerGrid'

export const StatsBlock: React.FC<StatsBlockProps> = ({ stats }) => {
  if (!stats || stats.length === 0) return null

  return (
    <div className="container py-8 md:py-12">
      <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-border py-10">
        {stats.map((stat, index) => (
          <StaggerItem key={index}>
            <div className="text-4xl md:text-5xl font-semibold text-foreground">
              {stat.value && <CountUp value={stat.value} />}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </div>
  )
}
