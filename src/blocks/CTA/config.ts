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
      name: 'cta',
      label: 'Call to Action',
      type: 'group',
      fields: contentFields,
    },
  ],
}
