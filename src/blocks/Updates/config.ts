import { HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const Updates: Block = {
  slug: 'updates',
  interfaceName: 'UpdatesBlock',
  labels: {
    singular: 'Updates',
    plural: 'Updates Blocks',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Commissioner Update',
          fields: [
            {
              name: 'commissionerUpdateTitle',
              type: 'text',
              required: true,
            },
            {
              name: 'commissionerUpdateContent',
              type: 'richText',
              required: true,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [...rootFeatures, HeadingFeature({ enabledHeadingSizes: ['h3'] })]
                },
              }),
            },
            {
              name: 'commissionerUpdateName',
              type: 'text',
              defaultValue: 'Scott',
              required: true,
            },
            {
              name: 'commissionerUpdateImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'commissionerUpdateUpdatedAt',
              type: 'date',
              admin: {
                position: 'sidebar',
              },
              required: true,
            },
          ],
        },
        {
          label: 'Tournament Standings',
          fields: [
            {
              name: 'standingsTitle',
              type: 'text',
              required: true,
            },
            {
              name: 'standings',
              type: 'array',
              label: 'Team Standings',
              admin: {
                components: {
                  RowLabel: '@/blocks/Updates/RowLabel',
                },
              },
              required: true,
              fields: [
                {
                  name: 'rank',
                  type: 'number',
                  required: true,
                },
                {
                  name: 'teamName',
                  type: 'text',
                  label: 'Team Name',
                  required: true,
                },
                {
                  name: 'wins',
                  type: 'number',
                  required: true,
                },
                {
                  name: 'losses',
                  type: 'number',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
