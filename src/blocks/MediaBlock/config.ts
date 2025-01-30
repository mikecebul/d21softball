import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData.media?.type === 'image'),
      },
    },
    {
      name: 'priority',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'If true, the media will be prioritized on first load',
      },
    },
  ],
}
