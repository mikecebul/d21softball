import type { Field, GroupField, Where } from 'payload'

import deepMerge from '@/utilities/deepMerge'
import { addHTTPS } from '@/hooks/addHTTPS'
import { iconSelect } from '../iconSelect/config'

export type LinkAppearances =
  | 'default'
  | 'outline'
  | 'brand'
  | 'brandSecondary'
  | 'brandOutline'
  | 'brandSecondaryOutline'

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  outline: {
    label: 'Outline',
    value: 'outline',
  },
  brand: {
    label: 'Brand',
    value: 'brand',
  },
  brandOutline: {
    label: 'Brand Outline',
    value: 'brandOutline',
  },
  brandSecondary: {
    label: 'Brand Secondary',
    value: 'brandSecondary',
  },
  brandSecondaryOutline: {
    label: 'Brand Outline Secondary',
    value: 'brandSecondaryOutline',
  },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  icon?: boolean
  overrides?: Record<string, unknown>
}) => Field

export const link: LinkType = ({
  appearances,
  disableLabel = false,
  icon = false,
  overrides = {},
} = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Open in new tab',
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Document to link to',
      maxDepth: 1,
      relationTo: ['pages', 'media', 'updates'],
      required: true,
      filterOptions: ({ relationTo }) => {
        if (relationTo === 'media') {
          return {
            mimeType: { contains: 'pdf' },
          }
        }
        if (relationTo === 'pages') {
          return true
        }
        if (relationTo === 'updates') {
          return true
        }
        return false
      },
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Custom URL',
      required: true,
      hooks: {
        beforeValidate: [addHTTPS],
      },
    },
  ]

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }))

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Label',
          required: true,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (icon) {
    linkResult.fields.push({ ...iconSelect })
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [
      appearanceOptions.default,
      appearanceOptions.outline,
      appearanceOptions.brand,
      appearanceOptions.brandOutline,
      appearanceOptions.brandSecondary,
      appearanceOptions.brandSecondaryOutline,
    ]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: 'Choose how the link should be rendered.',
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
    })
  }

  return deepMerge(linkResult, overrides)
}
