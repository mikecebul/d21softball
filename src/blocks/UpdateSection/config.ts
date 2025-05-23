import { Block } from 'payload'

export const UpdateSection: Block = {
  slug: 'updateSection',
  interfaceName: 'UpdateSectionType',
  fields: [
    {
      name: 'update',
      type: 'relationship',
      relationTo: 'updates',
      required: true,
      admin: {
        sortOptions: '-createdAt',
      },
    },
  ],
}
