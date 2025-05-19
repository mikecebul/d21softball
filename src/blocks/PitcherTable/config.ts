import {
  EXPERIMENTAL_TableFeature,
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
        features: [EXPERIMENTAL_TableFeature()],
      }),
    },
  ],
}
