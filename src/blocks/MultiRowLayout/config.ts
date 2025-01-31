import { Block } from 'payload'
import { TwoColumnLayout } from '../TwoColumnLayout/config'
import { TitleBlock } from '../Title/config'
import { RichText } from '../RichText/config'
import { UpdateCards } from '../UpdateCards/config'
import { Links } from '../Links/config'

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
      blocks: [TitleBlock, RichText, TwoColumnLayout, UpdateCards, Links],
    },
  ],
}
