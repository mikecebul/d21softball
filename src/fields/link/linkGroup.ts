import type { ArrayField, Field } from 'payload'

import type { LinkAppearances } from '@/fields/link'

import deepMerge from '@/utilities/deepMerge'
import { link } from '@/fields/link'

type LinkGroupType = (options?: {
  appearances?: LinkAppearances[] | false
  overrides?: Partial<ArrayField>
}) => Field

export const linkGroup: LinkGroupType = ({ appearances, overrides = {} } = {}) => {
  const generatedLinkGroup: Field = {
    name: 'links',
    type: 'array',
    interfaceName: 'LinkGroup',
    fields: [
      link({
        appearances,
      }),
    ],
  }

  return deepMerge(generatedLinkGroup, overrides)
}