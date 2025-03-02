import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { editorOrHigher } from '@/access/editorOrHigher'
import { superAdmin } from '@/access/superAdmin'
import { slugField } from '@/fields/slug'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { CollectionConfig } from 'payload'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { revalidateDelete } from '../Pages/hooks/revalidateDelete'
import { revalidateUpdate } from '@/hooks/revalidateUpdate'

export const Updates: CollectionConfig = {
  slug: 'updates',
  access: {
    create: editorOrHigher,
    delete: editorOrHigher,
    read: authenticatedOrPublished,
    update: editorOrHigher,
  },
  admin: {

    group: 'Content',
    hideAPIURL: !superAdmin,
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
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
        {
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
                condition: (data) => !data?.hideFromSearchEngines,
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
  ],
  hooks: {
    afterChange: [revalidateUpdate],
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
