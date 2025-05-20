import { Block } from 'payload'

export const TournamentsPage: Block = {
  slug: 'tournamentsPage',
  interfaceName: 'TournamentsPageType',
  labels: {
    singular: 'Tournaments Page',
    plural: 'Tournaments Pages',
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
      type: 'textarea',
    },
    {
      name: 'showAll',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'archives',
      type: 'checkbox',
      label: 'Show Only Archives',
      defaultValue: false,
      admin: {
        condition: (_, siblingData) => siblingData?.showAll === true,
      },
    },
    {
      name: 'tournaments',
      type: 'relationship',
      relationTo: 'tournaments',
      hasMany: true,
      admin: {
        condition: (_, siblingData) => siblingData?.showAll === false,
      },
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
        condition: (_, siblingData) => siblingData?.showAll === false,
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
