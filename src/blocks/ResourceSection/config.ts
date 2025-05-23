import { Block } from 'payload'

export const ResourceSection: Block = {
  slug: 'resourceSection',
  interfaceName: 'ResourceSectionType',
  fields: [
    {
      name: 'resource',
      type: 'relationship',
      relationTo: 'resources',
      hasMany: false,
      required: true,
      admin: {
        sortOptions: '-createdAt',
      },
    },
  ],
}
