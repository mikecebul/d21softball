import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { LinksBlock } from './Links/Component'
import { TournamentsBlock } from './TournamentsBlock/Component'
import { RichTextBlock } from './RichText/Component'
import { TournamentsPageBlock } from './TournamentsPage/Component'
import { FormBlock } from './Form/Component'
import { MediaBlock } from './MediaBlock/Component'
import { TournamentCardsBlock } from './TournamentCards/Component'
import { FeatureCardsBlock } from './FeatureCards/Component'
import { LayoutBlock } from './Layout/Component'
import { NewTwoColumnLayoutBlock } from './NewTwoColumnLayout/Component'

const blockComponents = {
  richText: RichTextBlock,
  linksBlock: LinksBlock,
  tournaments: TournamentsBlock,
  tournamentsPage: TournamentsPageBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  tournamentCards: TournamentCardsBlock,
  featureCards: FeatureCardsBlock,
  newTwoColumnLayout: NewTwoColumnLayoutBlock,
  layout: LayoutBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][number][]
  nested?: boolean
}> = (props) => {
  const { blocks, nested = false } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return nested ? (
                <Block key={index} {...(block as any)} nested={nested} />
              ) : (
                <div key={index} className="py-24 last:pb-36">
                  <Block {...(block as any)} nested={nested} />
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
