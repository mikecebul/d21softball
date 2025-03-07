import { Block } from 'payload'

export const FormConfig: Block = {
  slug: 'formConfig',
  interfaceName: 'FormConfigBlock',
  fields: [
    {
      name: 'label',
      type: 'ui',
      admin: {
        components: {
          Field: '@/blocks/Form/FormLabel',
        },
      },
    },
  ],
}
