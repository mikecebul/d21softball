import { link } from '@/fields/link'
import { Block } from 'payload'

export const ResourceCards: Block = {
  slug: 'resourceCards',
  interfaceName: 'ResourceCardsType',
  labels: {
    singular: 'Resource Cards',
    plural: 'Many Resource Cards',
  },
  fields: [
    {
      name: 'showAll',
      type: 'checkbox',
      label: 'Use all published items',
      defaultValue: false,
    },
    {
      name: 'resources',
      type: 'relationship',
      relationTo: 'resources',
      hasMany: true,
      minRows: 1,
      admin: {
        condition: (_, siblingData) => !siblingData?.showAll,
      }
    },
    link({
      overrides: {
        admin: {
          condition: (_, siblingData) => !siblingData.showAll,
        },
      },
    }),
  ],
}
