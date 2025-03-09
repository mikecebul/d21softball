import { Block } from 'payload'

export const FormConfig: Block = {
  slug: 'formConfig',
  interfaceName: 'FormConfigType',
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
  ],
}
