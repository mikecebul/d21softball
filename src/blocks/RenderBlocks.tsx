import React, { Fragment } from 'react'

import type {
  Page,
  TwoColumnLayoutBlock as TwoColumnLayoutBlockType,
  MultiRowLayoutBlock as MultiRowLayoutBlockType,
  HeroLayoutBlockType,
} from '@/payload-types'
import { HeroLayoutBlock } from './layouts/HeroLayout/Component'
import { MultiRowLayoutBlock } from '@/blocks/layouts/MultiRowLayout/Component'
import { TwoColumnLayoutBlock } from '@/blocks/layouts/TwoColumnLayout/Component'

import { CardsBlock } from './Cards/Component'
import { CTA } from './CTA/Component'
import { FormBlock } from './Form/Component'
import { LinksBlock } from './Links/Component'
import { MediaBlock } from './MediaBlock/Component'
import { RichTextBlock } from './RichText/Component'
import { TitleBlock } from './Title/Component'
import { TournamentsBlock } from './TournamentsBlock/Component'
import { TournamentsPageBlock } from './TournamentsPage/Component'

const blockComponents = {
  richText: RichTextBlock,
  linksBlock: LinksBlock,
  tournaments: TournamentsBlock,
  tournamentsPage: TournamentsPageBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  twoColumnLayout: TwoColumnLayoutBlock,
  multiRowLayout: MultiRowLayoutBlock,
  cta: CTA,
  titleBlock: TitleBlock,
  cards: CardsBlock,
  heroLayout: HeroLayoutBlock,
}

export const RenderBlocks: React.FC<{
  blocks:
  | Page['layout'][number][]
  | TwoColumnLayoutBlockType['columnOne']
  | TwoColumnLayoutBlockType['columnTwo']
  | MultiRowLayoutBlockType['blocks']
  | HeroLayoutBlockType['blocks']
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
