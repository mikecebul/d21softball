import { Block } from 'payload'
import { TwoColumnLayout } from '../TwoColumnLayout/config'
import { TitleBlock } from '@/blocks/Title/config'
import { RichText } from '@/blocks/RichText/config'
import { Cards } from '@/blocks/Cards/config'
import { Links } from '@/blocks/Links/config'

export const MultiRowLayout: Block = {
  slug: 'multiRowLayout',
  interfaceName: 'MultiRowLayoutBlock',
  labels: {
    singular: 'Multi Row Layout',
    plural: 'Multi Row Layouts',
  },
  fields: [
    {
      name: 'nested',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [TitleBlock, RichText, TwoColumnLayout, Cards, Links],
    },
  ],
}
