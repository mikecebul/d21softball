import { Block } from 'payload'

export const UpdateCards: Block = {
  slug: 'updateCards',
  labels: {
    singular: 'Update Cards',
    plural: 'Many Update Cards',
  },
  interfaceName: 'UpdateCardsType',
  fields: [
    {
      name: 'allUpdates',
      type: 'checkbox',
      label: 'Use all published updates',
      defaultValue: false,
      required: true,
    },
    {
      name: 'updates',
      type: 'relationship',
      relationTo: 'updates',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => !siblingData.allUpdates,
      },
    },
  ],
}
