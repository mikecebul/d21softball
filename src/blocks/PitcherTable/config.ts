import {
  EXPERIMENTAL_TableFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const PitcherTable: Block = {
  slug: 'pitcherTable',
  interfaceName: 'PitcherTable',
  fields: [
    {
      name: 'pitcherTable',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => {
          return [
            ...defaultFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3'] }),
            EXPERIMENTAL_TableFeature(),
          ]
        },
      }),
    },
  ],
}
