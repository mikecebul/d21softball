import { CollectionConfig } from 'payload'
import { anyone } from '../../access/anyone'
import { fileURLToPath } from 'url'
import path from 'path'
import { superAdmin } from '@/access/superAdmin'
import { authenticated } from '@/access/authenticated'
import { editorOrHigher } from '@/access/editorOrHigher'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  access: {
    create: editorOrHigher,
    delete: editorOrHigher,
    read: anyone,
    update: editorOrHigher,
  },
  admin: {
    folders: true,
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    group: 'Admin',
    hideAPIURL: !superAdmin,
  },
  upload: {
    formatOptions: {
      format: 'webp',
    },
    resizeOptions: {
      width: 1600,
      height: undefined,
    },
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 300,
        formatOptions: {
          format: 'webp',
        },
        generateImageName: ({ originalName }) => {
          return `${originalName}-thumbnail`
        },
      },
      {
        name: 'meta',
        width: 1200,
        height: 630,
        position: 'top',
        fit: 'inside',
        formatOptions: {
          format: 'webp',
        },
        generateImageName: ({ originalName }) => {
          return `${originalName}-meta`
        },
      },
    ],
    adminThumbnail: 'thumbnail',
    staticDir: path.resolve(dirname, '../../../public/media'),
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Alternative text for SEO and accessibility',
      },
    },
    {
      name: 'caption',
      type: 'text',
      // admin: {
      //   condition: (_, siblingData) => siblingData.mimeType.startsWith('image/'),
      // },
    },
    {
      name: 'prefix',
      type: 'text',
      admin: {
        hidden: true,
      },
    },
  ],
}
