import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { CarouselBlock } from '@/blocks/Carousel/Component'
import { ClientLogosBlock } from '@/blocks/ClientLogos/Component'
import { ComparisonBlock } from '@/blocks/Comparison/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FeatureGridBlock } from '@/blocks/FeatureGrid/Component'
import { FlagshipBannerBlock } from '@/blocks/FlagshipBanner/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { MediaTextBlock } from '@/blocks/MediaText/Component'
import { MethodologyBlock } from '@/blocks/Methodology/Component'
import { ServicesShowcaseBlock } from '@/blocks/ServicesShowcase/Component'
import { StatsBlock } from '@/blocks/Stats/Component'
import { TeamBlock } from '@/blocks/Team/Component'

const blockComponents = {
  archive: ArchiveBlock,
  carousel: CarouselBlock,
  clientLogos: ClientLogosBlock,
  comparison: ComparisonBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  featureGrid: FeatureGridBlock,
  flagshipBanner: FlagshipBannerBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  mediaText: MediaTextBlock,
  methodology: MethodologyBlock,
  servicesShowcase: ServicesShowcaseBlock,
  stats: StatsBlock,
  team: TeamBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
