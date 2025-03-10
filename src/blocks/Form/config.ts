import { Block } from 'payload'

export const FormConfig: Block = {
  slug: 'form',
  interfaceName: 'FormType',
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
    },
  ],
}
