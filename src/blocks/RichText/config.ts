import { Block } from 'payload'

export const RichText: Block = {
  slug: 'richText',
  interfaceName: 'RichTextBlock',
  fields: [
    {
      name: 'richContent',
      type: 'richText',
    },
  ],
}
