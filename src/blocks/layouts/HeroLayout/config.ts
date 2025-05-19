import { Block } from 'payload'
import { TwoColumnLayout } from '@/blocks/layouts/TwoColumnLayout/config'
import { CTA } from '@/blocks/CTA/config'
export const HeroLayout: Block = {
  slug: 'heroLayout',
  interfaceName: 'HeroLayoutBlockType',
  labels: {
    singular: 'Hero Layout',
    plural: 'Hero Layouts',
  },
  fields: [
    {
      name: 'blocks',
      type: 'blocks',
      maxRows: 1,
      blocks: [CTA, TwoColumnLayout],
    },
  ],
}
