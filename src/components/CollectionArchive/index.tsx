import { cn } from '@/utilities/ui'
import React from 'react'

import { Card, CardPostData } from '@/components/Card'
import { StaggerGrid, StaggerItem } from '@/components/Motion/StaggerGrid'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  if (!posts || posts.length === 0) {
    return (
      <div className="container">
        <p className="text-muted-foreground text-center py-16">
          Todavía no hay artículos para mostrar.
        </p>
      </div>
    )
  }

  return (
    <div className={cn('container')}>
      <div>
        <StaggerGrid className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <StaggerItem className="col-span-4" key={index}>
                  <Card className="h-full" doc={result} relationTo="posts" showCategories />
                </StaggerItem>
              )
            }

            return null
          })}
        </StaggerGrid>
      </div>
    </div>
  )
}
