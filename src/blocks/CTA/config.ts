import { contentFields } from '@/fields/contentFields'
import { Block } from 'payload'

export const CTA: Block = {
  slug: 'cta',
  labels: {
    singular: 'Call to Action',
    plural: 'Call to Actions',
  },
  interfaceName: 'CTABlock',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'verticalAlignment',
          type: 'select',
          options: ['top', 'center', 'bottom'],
          defaultValue: 'center',
          admin: {
            width: '25%',
          },
        },
      ],
    },
    {
      name: 'cta',
      label: 'Call to Action',
      type: 'group',
      fields: contentFields,
    },
  ],
}
