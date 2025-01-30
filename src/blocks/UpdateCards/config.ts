import { HeadingFeature } from '@payloadcms/richtext-lexical'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const UpdateCards: Block = {
  slug: 'updateCards',
  labels: {
    singular: 'Update Cards',
    plural: 'Many Update Cards',
  },
  interfaceName: 'UpdateCardsType',
  fields: [
    {
      name: 'cards',
      type: 'array',
      admin: {
        components: {
          RowLabel: '@/components/RowLabel/RowLabelWithTitle',
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'dateOrDescription',
          label: 'Date or Description',
          type: 'radio',
          defaultValue: 'date',
          options: ['date', 'description', 'none'],
        },
        {
          name: 'description',
          type: 'text',
          admin: {
            condition: (_, siblingData) => siblingData.dateOrDescription === 'description',
          },
        },
        {
          name: 'updatedAt',
          type: 'date',
          admin: {
            condition: (_, siblingData) => siblingData.dateOrDescription === 'date',
          },
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, HeadingFeature({ enabledHeadingSizes: ['h3'] })]
            },
          }),
        },
      ],
    },
  ],
}
