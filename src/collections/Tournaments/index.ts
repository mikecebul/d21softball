import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { editorOrHigher } from '@/access/editorOrHigher'
import { superAdmin } from '@/access/superAdmin'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { revalidatePage } from './revalidatePage'
import { revalidateDelete } from './revalidateDelete'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { baseUrl } from '@/utilities/baseUrl'

export const Tournaments: CollectionConfig = {
  slug: 'tournaments',
  labels: {
    singular: 'Tournament',
    plural: 'Tournaments',
  },
  access: {
    create: editorOrHigher,
    delete: editorOrHigher,
    read: authenticatedOrPublished,
    update: editorOrHigher,
  },
  admin: {
    folders: true,
    group: 'Softball',
    hideAPIURL: !superAdmin,
    useAsTitle: 'title',
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          path: `/tournaments/${typeof data?.slug === 'string' ? data.slug : ''}`,
        })
        return `${baseUrl}${path}`
      },
    },
    preview: (doc) =>
      generatePreviewPath({
        path: `/tournaments/${typeof doc?.slug === 'string' ? doc.slug : ''}`,
      }),
  },
  enableQueryPresets: true,
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'class',
              type: 'text',
              required: true,
            },
            {
              name: 'location',
              type: 'text',
              required: true,
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'startDate',
                  type: 'date',
                  admin: {
                    date: {
                      pickerAppearance: 'dayOnly',
                      displayFormat: 'MMM d, yyyy',
                    },
                  },
                  required: true,
                },
                {
                  name: 'endDate',
                  type: 'date',
                  admin: {
                    date: {
                      pickerAppearance: 'dayOnly',
                      displayFormat: 'MMM d, yyyy',
                    },
                  },
                  required: true,
                },
              ],
            },
            {
              name: 'description',
              type: 'richText',
              required: true,
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => {
                  return [
                    ...defaultFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
                  ]
                },
              }),
            },
            {
              name: 'price',
              type: 'number',
              required: true,
            },
            {
              name: 'teams',
              label: 'Participating Teams',
              type: 'array',
              admin: {
                components: {
                  RowLabel: '@/collections/Tournaments/rowLabels/RowLabelForTeam',
                },
              },
              fields: [
                {
                  name: 'team',
                  type: 'relationship',
                  relationTo: 'teams',
                  hasMany: false,
                  required: true,
                },
                {
                  name: 'isPaid',
                  type: 'checkbox',
                  label: 'Paid',
                  defaultValue: false,
                },
              ],
            },
          ],
        },
        {
          label: 'Games',
          fields: [
            {
              name: 'games',
              type: 'array',
              fields: [
                {
                  name: 'date',
                  type: 'date',
                  admin: {
                    date: {
                      pickerAppearance: 'dayAndTime',
                    },
                  },
                },
                {
                  name: 'homeTeam',
                  type: 'group',
                  fields: [
                    {
                      name: 'team',
                      type: 'relationship',
                      relationTo: 'teams',
                      hasMany: false,
                      required: true,
                      filterOptions: ({ data }) => {
                        // Get the list of participating team IDs from the tournament
                        const participatingTeamIds = data?.teams?.map((t) => t.team) || []
                        return {
                          id: {
                            in: participatingTeamIds,
                          },
                        }
                      },
                    },
                    {
                      name: 'score',
                      type: 'number',
                      min: 0,
                      admin: {
                        description: 'Home team score',
                      },
                    },
                  ],
                },
                {
                  name: 'visitorTeam',
                  type: 'group',
                  fields: [
                    {
                      name: 'team',
                      type: 'relationship',
                      relationTo: 'teams',
                      hasMany: false,
                      required: true,
                      filterOptions: ({ data }) => {
                        // Get the list of participating team IDs from the tournament
                        const participatingTeamIds = data?.teams?.map((t) => t.team) || []

                        return {
                          id: {
                            in: participatingTeamIds,
                          },
                        }
                      },
                    },
                    {
                      name: 'score',
                      type: 'number',
                      min: 0,
                      admin: {
                        description: 'Visitor team score',
                      },
                    },
                  ],
                },
                {
                  name: 'highlights',
                  type: 'richText',
                  label: 'Game Highlights',
                },
              ],
            },
          ],
        },
        {
          name: 'results',
          label: 'Tournament Results',
          fields: [
            {
              name: 'standings',
              type: 'richText',
            },
            {
              name: 'awards',
              type: 'richText',
            },
          ],
        },
        {
          name: 'gallery',
          fields: [
            {
              name: 'media',
              type: 'relationship',
              relationTo: 'media',
              hasMany: true,
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            {
              name: 'hideFromSearchEngines',
              type: 'checkbox',
              defaultValue: false,
              label: 'Hide from search engines',
            },
            {
              name: 'metadata',
              type: 'group',
              admin: {
                condition: (data) => data.meta.hideFromSearchEngines === false,
              },
              fields: [
                OverviewField({
                  titlePath: 'meta.metadata.title',
                  descriptionPath: 'meta.metadata.description',
                  imagePath: 'meta.metadata.image',
                }),
                MetaTitleField({
                  hasGenerateFn: true,
                }),
                MetaImageField({
                  relationTo: 'media',
                }),
                MetaDescriptionField({}),
                PreviewField({
                  hasGenerateFn: true,
                  titlePath: 'meta.metadata.title',
                  descriptionPath: 'meta.metadata.description',
                }),
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'archived',
      type: 'checkbox',
      label: 'Archived',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        width: 'full',
        description: 'If checked, this tournament will found at /archives.',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
}
