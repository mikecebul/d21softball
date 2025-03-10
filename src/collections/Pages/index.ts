import type { CollectionConfig } from 'payload'

import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { Links } from '@/blocks/Links/config'
import { superAdmin } from '@/access/superAdmin'
import { baseUrl } from '@/utilities/baseUrl'
import { MultiRowLayout } from '@/blocks/layouts/MultiRowLayout/config'
import { TwoColumnLayout } from '@/blocks/layouts/TwoColumnLayout/config'
import { revalidateDelete } from './hooks/revalidateDelete'
import { editorOrHigher } from '@/access/editorOrHigher'
import { HeroLayout } from '@/blocks/layouts/HeroLayout/config'
import { TournamentsPage } from '@/blocks/TournamentsPage/config'
import { FormConfig } from '@/blocks/Form/config'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: editorOrHigher,
    delete: editorOrHigher,
    read: authenticatedOrPublished,
    update: editorOrHigher,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    group: 'Website Builder',
    hideAPIURL: !superAdmin,
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          path: `/${typeof data?.slug === 'string' ? data.slug : ''}`,
        })
        return `${baseUrl}${path}`
      },
    },
    preview: (doc) =>
      generatePreviewPath({ path: `/${typeof doc?.slug === 'string' ? doc.slug : ''}` }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                HeroLayout,
                TwoColumnLayout,
                MultiRowLayout,
                Links,
                TournamentsPage,
                FormConfig,
              ],
              required: true,
            },
          ],
          label: 'Content',
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
                  // if the `generateUrl` function is configured
                  hasGenerateFn: true,

                  // field paths to match the target field for data
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
