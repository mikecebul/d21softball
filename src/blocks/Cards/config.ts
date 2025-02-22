import { link } from '@/fields/link'
import { Block } from 'payload'

export const Cards: Block = {
  slug: 'cards',
  labels: {
    singular: 'Cards Block',
    plural: 'Cards Blocks',
  },
  interfaceName: 'CardsBlockType',
  fields: [
    {
      name: 'cardType',
      type: 'radio',
      options: [
        {
          label: 'Updates',
          value: 'updates',
        },
        {
          label: 'Resources',
          value: 'resources',
        },
        {
          label: 'Sponsors',
          value: 'sponsors',
        },
      ],
      defaultValue: 'updates',
      required: true,
    },
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
      admin: {
        condition: (_, siblingData) => siblingData?.cardType === 'updates' && !siblingData?.showAll,
      }
    },
    {
      name: 'resources',
      type: 'relationship',
      relationTo: 'resources',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.cardType === 'resources' && !siblingData?.showAll,
      }
    },
    {
      name: 'sponsors',
      type: 'relationship',
      relationTo: 'sponsors',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.cardType === 'sponsors' && !siblingData?.showAll,
      }
    },
    {
      name: 'showLink',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      label: 'Show link to items page',
    },
    link({
      overrides: {
        admin: {
          condition: (_, siblingData) => siblingData.showLink,
        },
      },
    }),
  ],
}
