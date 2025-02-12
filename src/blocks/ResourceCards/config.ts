import { Block } from 'payload'

export const ResourceCards: Block = {
  slug: 'resourceCards',
  labels: {
    singular: 'Resource Cards',
    plural: 'Many Resource Cards',
  },
  interfaceName: 'ResourceCardsType',
  fields: [
    {
      name: 'allResources',
      type: 'checkbox',
      label: 'Use all published resources',
      defaultValue: false,
      required: true,
    },
    {
      name: 'resources',
      type: 'relationship',
      relationTo: 'resources',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => !siblingData.allResources,
      },
    },
  ],
}
