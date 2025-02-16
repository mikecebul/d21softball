import { Block } from 'payload'
import { FormBlock } from '@/blocks/Form/config'
import { CTA } from '@/blocks/CTA/config'
import { RichText } from '@/blocks/RichText/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'

export const TwoColumnLayout: Block = {
  slug: 'twoColumnLayout',
  interfaceName: 'TwoColumnLayoutBlock',
  fields: [
    {
      name: 'nested',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'breakpoint',
      type: 'radio',
      defaultValue: 'md',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
      admin: {
        description: 'The breakpoint at which the layout switches to a two column layout',
      },
    },
    {
      name: 'columnOne',
      type: 'blocks',
      blocks: [CTA, RichText, MediaBlock, FormBlock],
      maxRows: 1,
    },
    {
      name: 'columnTwo',
      type: 'blocks',
      blocks: [MediaBlock, FormBlock, CTA, RichText],
      maxRows: 1,
    },
  ],
}
