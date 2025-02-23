import { link } from '@/fields/link'
import { Block } from 'payload'

export const UpdateCards: Block = {
  slug: 'updateCards',
  interfaceName: 'UpdateCardsType',
  labels: {
    singular: 'Update Cards',
    plural: 'Many Update Cards',
  },
  fields: [
    {
      name: 'showAll',
      type: 'checkbox',
      label: 'Use all published items',
      defaultValue: false,
      required: true,
    },
    {
      name: 'updates',
      type: 'relationship',
      relationTo: 'updates',
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
