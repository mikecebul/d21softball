import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { imageSearchPlugin } from '@payload-bites/image-search'
import { stripePlugin } from '@payloadcms/plugin-stripe'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage as s3StoragePlugin } from '@payloadcms/storage-s3'
import { S3_PLUGIN_CONFIG } from './plugins/s3'
import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  UnorderedListFeature,
  OrderedListFeature,
  lexicalEditor,
  BlocksFeature,
  ParagraphFeature,
} from '@payloadcms/richtext-lexical'
import sharp from 'sharp' // editor-import
import { UnderlineFeature } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Pages } from './collections/Pages'
import Users from './collections/Users'
import { Footer } from './globals/Footer/config'
import { Header } from './globals/Header/config'
import { revalidateRedirects } from './hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL, GenerateImage } from '@payloadcms/plugin-seo/types'
import { Page } from 'src/payload-types'
import { CompanyInfo } from './globals/CompanyInfo/config'
import { superAdmin } from './access/superAdmin'
import { Tournaments } from './collections/Tournaments'
import { Media } from './collections/Media'
import { MediaBlock } from './blocks/MediaBlock/config'
import { baseUrl } from './utilities/baseUrl'
import { ArrayBlock, DateOfBirth } from './blocks/Form/blocks'
import { checkoutSessionCompleted } from './plugins/stripe/webhooks/checkoutSessionCompleted'
import { revalidatePath } from 'next/cache'
import { editorOrHigher } from './access/editorOrHigher'
import { anyone } from './access/anyone'
import { adminOrSuperAdmin } from './access/adminOrSuperAdmin'
import { authenticated } from './access/authenticated'
import { Updates } from './collections/Updates'
import { Resources } from './collections/Resources'
import { Sponsors } from './collections/Sponsors'
import { defaultLexical } from './fields/defaultLexical'
import { Teams } from './collections/Teams'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  if ('name' in doc) {
    return doc.name ? `${doc.name} | D21 Softball` : 'D21 Softball'
  }
  return doc?.title ? `${doc.title} | D21 Softball` : 'D21 Softball'
}

const generateURL: GenerateURL<Page> = ({ doc }) => {
  if (!doc.slug) return baseUrl
  return `${baseUrl}/${doc.slug}`
}
const generateImage: GenerateImage<Page> = ({ doc }) => {
  if (typeof doc.meta?.metadata?.image === 'object' && doc.meta?.metadata?.image) {
    return doc.meta.metadata.image.url || '/golf-hero.jpg'
  }
  return '/golf-hero.jpg'
}

export default buildConfig({
  admin: {
    avatar: 'default',
    components: {
      graphics: {
        Icon: '@/graphics/Icon',
        Logo: '@/components/Logo/Graphic',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      icons: [{ url: '/favicon.ico' }],
      titleSuffix: ' | D21 Softball',
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI!,
  }),
  collections: [Pages, Updates, Resources, Sponsors, Tournaments, Teams, Media, Users],
  cors: [baseUrl].filter(Boolean),
  csrf: [baseUrl].filter(Boolean),
  // email: nodemailerAdapter({
  //   defaultFromAddress: process.env.EMAIL_SMTP_USER || 'website@d21softball.org',
  //   defaultFromName: 'D21 Softball',
  //   transportOptions: {
  //     host: process.env.EMAIL_SMTP_HOST,
  //     port: process.env.EMAIL_SMTP_PORT,
  //     auth: {
  //       user: process.env.EMAIL_SMTP_USER,
  //       pass: process.env.EMAIL_SMTP_PASS,
  //     },
  //   },
  // }),
  endpoints: [],
  globals: [Header, Footer, CompanyInfo],
  plugins: [
    imageSearchPlugin(),
    stripePlugin({
      isTestKey: process.env.STRIPE_SECRET_KEY?.includes('sk_test') ?? true,
      stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
      stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOKS_ENDPOINT_SECRET,
      webhooks: {
        'checkout.session.completed': checkoutSessionCompleted,
      },
      logs: false,
    }),
    formBuilderPlugin({
      defaultToEmail: 'info@cvxjrgolf.org',
      fields: {
        array: ArrayBlock,
        dateOfBirth: DateOfBirth,
        payment: true,
      },
      beforeEmail: (emailsToSend, beforeChangeParams) => {
        const { data } = beforeChangeParams
        const formData = data.submissionData as Record<string, any[]>

        let additionalContent = '<hr style="margin: 30px 0; border: 1px solid #eee;">'
        additionalContent += '<h2 style="color: #333;">Registration Details</h2>'

        const arrayFields = Object.entries(formData).filter(([_, value]) => Array.isArray(value))

        arrayFields.forEach(([fieldName, items]) => {
          additionalContent += `<h3 style="margin-top: 20px; color: #333;">${fieldName.toUpperCase()}</h3>`

          items.forEach((item, index) => {
            additionalContent += `<div style="margin: 10px 0; padding: 10px; background: #f5f5f5; border-radius: 4px;">`
            Object.entries(item).forEach(([key, value]) => {
              const formattedKey = key
                .split(/(?=[A-Z])|_|\s/)
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ')
              additionalContent += `<p><strong>${formattedKey}:</strong> ${value}</p>`
            })
            additionalContent += '</div>'
          })
        })

        emailsToSend.forEach((email) => {
          email.html = `${email.html || ''}${additionalContent}`
        })

        return emailsToSend
      },
      formOverrides: {
        access: {
          admin: authenticated,
          create: editorOrHigher,
          delete: editorOrHigher,
          update: editorOrHigher,
          read: authenticated,
        },
        admin: {
          group: 'Form Builder',
        },
        hooks: {
          afterChange: [() => revalidatePath('/register')],
        },
        fields: ({ defaultFields }) => [
          ...defaultFields.map((field) => {
            if ('name' in field && field.name === 'confirmationMessage') {
              return {
                ...field,
                editor: lexicalEditor({
                  features: ({ defaultFeatures }) => [
                    ...defaultFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ],
                }),
              }
            }
            return field
          }),
        ],
      },
      formSubmissionOverrides: {
        access: {
          admin: authenticated,
          update: adminOrSuperAdmin,
          delete: adminOrSuperAdmin,
          create: anyone,
          read: authenticated,
        },
        admin: {
          group: 'Form Builder',
          useAsTitle: 'title',
        },
        labels: {
          singular: 'Registration',
          plural: 'Registrations',
        },
        fields: ({ defaultFields }) => {
          const formField = defaultFields.find((field) => 'name' in field && field.name === 'form')

          return [
            ...(formField ? [formField] : []),
            {
              name: 'title',
              type: 'text',
            },
            {
              name: 'submissionData',
              type: 'json',
              admin: {
                components: {
                  Field: '@/plugins/form-builder/FormData',
                },
              },
            },
            {
              name: 'payment',
              type: 'group',
              admin: {
                position: 'sidebar',
              },
              fields: [
                {
                  name: 'amount',
                  type: 'number',
                },
                {
                  name: 'status',
                  type: 'select',
                  defaultValue: 'pending',
                  options: [
                    { label: 'Pending', value: 'pending' },
                    { label: 'Paid', value: 'paid' },
                    { label: 'Cancelled', value: 'cancelled' },
                    { label: 'Refunded', value: 'refunded' },
                  ],
                },
              ],
            },
          ]
        },
      },
    }),
    redirectsPlugin({
      collections: ['pages'],
      overrides: {
        access: {
          admin: (args) => !superAdmin(args),
          read: superAdmin,
          delete: superAdmin,
          update: superAdmin,
          create: superAdmin,
        },
        admin: {
          group: 'Admin',
        },
        // @ts-expect-error
        fields: ({ defaultFields }) => {
          return defaultFields.map((field) => {
            if ('name' in field && field.name === 'from') {
              return {
                ...field,
                admin: {
                  description: 'You will need to rebuild the website when changing this field.',
                },
              }
            }
            return field
          })
        },
        hooks: {
          afterChange: [revalidateRedirects],
        },
      },
    }),
    seoPlugin({
      generateTitle,
      generateURL,
      generateImage,
    }),
    s3StoragePlugin({
      ...S3_PLUGIN_CONFIG,
      collections: {
        media: {
          disableLocalStorage: true,
          generateFileURL: ({ filename, prefix }) => {
            if (typeof filename !== 'string') return null as unknown as string
            return `https://${process.env.NEXT_PUBLIC_S3_HOSTNAME}/${prefix}/${filename}`
          },
          prefix: process.env.NEXT_PUBLIC_UPLOAD_PREFIX,
        },
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET!,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
