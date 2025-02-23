import { Block } from 'payload'
import { TwoColumnLayout } from '../TwoColumnLayout/config'
import { TitleBlock } from '@/blocks/Title/config'
import { RichText } from '@/blocks/RichText/config'
import { Links } from '@/blocks/Links/config'
import { TournamentCards } from '@/blocks/TournamentCards/config'
import { UpdateCards } from '@/blocks/Cards/UpdateCards/config'
import { SponsorCards } from '@/blocks/Cards/SponsorCards/config'
import { ResourceCards } from '@/blocks/Cards/ResourceCards/config'

export const MultiRowLayout: Block = {
  slug: 'multiRowLayout',
  interfaceName: 'MultiRowLayoutBlock',
  labels: {
    singular: 'Multi Row Layout',
    plural: 'Multi Row Layouts',
  },
  fields: [
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [TitleBlock, RichText, TwoColumnLayout, UpdateCards, SponsorCards, ResourceCards, Links, TournamentCards],
    },
  ],
}
