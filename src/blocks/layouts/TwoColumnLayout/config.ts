import { Block } from 'payload'
import { CTA } from '@/blocks/CTA/config'
import { RichText } from '@/blocks/RichText/config'
import { MediaBlock } from '@/blocks/MediaBlock/config'
import { UpdateSection } from '@/blocks/UpdateSection/config'

export const TwoColumnLayout: Block = {
  slug: 'twoColumnLayout',
  interfaceName: 'TwoColumnLayoutBlock',
  fields: [
    {
      name: 'nested',
      type: 'checkbox',
      defaultValue: false,
      hidden: true,
    },
    {
      name: 'direction',
      type: 'radio',
      defaultValue: 'ltr',
      options: [
        { label: 'Left to Right', value: 'ltr' },
        { label: 'Right to Left', value: 'rtl' },
      ],
      admin: {
        description: 'The direction of the layout on desktop',
      },
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
      name: 'columns',
      type: 'blocks',
      blocks: [CTA, RichText, MediaBlock, UpdateSection],
      maxRows: 2,
    },
  ],
}
