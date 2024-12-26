import { Block } from 'payload'

export const TournamentsPage: Block = {
  slug: 'tournamentsPage',
  interfaceName: 'TournamentsPageBlock',
  labels: {
    singular: 'Tournaments Page',
    plural: 'Tournaments Pages',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
    },
    {
      name: 'tournaments',
      type: 'relationship',
      relationTo: 'tournaments',
      hasMany: true,
    },
    {
      name: 'announcements',
      type: 'array',
      label: 'Announcements',
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/components/RowLabel/RowLabelWithTitle',
        },
      },
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Description',
          type: 'richText',
          required: true,
        },
      ],
    },
  ],
}
