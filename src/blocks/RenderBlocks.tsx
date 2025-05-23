import React, { Fragment } from 'react'

import type {
  Page,
  TwoColumnLayoutBlock as TwoColumnLayoutBlockType,
  MultiRowLayoutBlock as MultiRowLayoutBlockType,
  HeroLayoutBlockType,
  UpdateSectionType,
} from '@/payload-types'
import { HeroLayoutBlock } from './layouts/HeroLayout/Component'
import { MultiRowLayoutBlock } from '@/blocks/layouts/MultiRowLayout/Component'
import { TwoColumnLayoutBlock } from '@/blocks/layouts/TwoColumnLayout/Component'

import { CTA } from './CTA/Component'
import { LinksBlock } from './Links/Component'
import { MediaBlock } from './MediaBlock/Component'
import { RichTextBlock } from './RichText/Component'
import { TitleBlock } from './Title/Component'
import { TournamentsPageBlock } from './TournamentsPage/Component'
import { TournamentCardsBlock } from './Cards/TournamentCards/Component'
import { UpdateCardsBlock } from './Cards/UpdateCards/Component'
import { SponsorCardsBlock } from './Cards/SponsorCards/Component'
import { ResourceCardsBlock } from './Cards/ResourceCards/Component'
import { UpdateSectionBlock } from './UpdateSection/Component'
import { FormComponent } from './Form/Component'
import { PitcherTable } from './PitcherTable/Component'
import { ResourceSectionBlock } from './ResourceSection/Component'

const blockComponents = {
  richText: RichTextBlock,
  linksBlock: LinksBlock,
  tournamentsPage: TournamentsPageBlock,
  tournamentCards: TournamentCardsBlock,
  mediaBlock: MediaBlock,
  twoColumnLayout: TwoColumnLayoutBlock,
  multiRowLayout: MultiRowLayoutBlock,
  cta: CTA,
  titleBlock: TitleBlock,
  heroLayout: HeroLayoutBlock,
  resourceCards: ResourceCardsBlock,
  updateCards: UpdateCardsBlock,
  sponsorCards: SponsorCardsBlock,
  updateSection: UpdateSectionBlock,
  resourceSection: ResourceSectionBlock,
  form: FormComponent,
  pitcherTable: PitcherTable,
}

export const RenderBlocks: React.FC<{
  blocks:
    | Page['layout'][number][]
    | TwoColumnLayoutBlockType['columns']
    | UpdateSectionType
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
                <div key={index} className="py-24 first:pt-12">
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
