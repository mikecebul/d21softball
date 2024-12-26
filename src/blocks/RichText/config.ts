import { Block } from 'payload'

export const RichText: Block = {
  slug: 'richText',
  interfaceName: 'RichTextBlock',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'richContent',
      type: 'richText',
    },
    {
      name: 'priority',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
  ],
}