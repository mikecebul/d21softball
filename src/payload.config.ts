import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { imageSearchPlugin } from '@payload-bites/image-search'
import { stripePlugin } from '@payloadcms/plugin-stripe'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage as s3StoragePlugin } from '@payloadcms/storage-s3'
import { S3_PLUGIN_CONFIG } from './plugins/s3'
import sharp from 'sharp' // editor-import
import path from 'path'
import { buildConfig, Field } from 'payload'
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
import { baseUrl } from './utilities/baseUrl'
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
import { render } from '@react-email/render'
import FormSubmissionEmail from './emails/notification'

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
    return doc.meta.metadata.image.url || '/sunset-at-waterfront.webp'
  }
  return '/sunset-at-waterfront.webp'
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
  email: nodemailerAdapter({
    defaultFromAddress: process.env.EMAIL_SMTP_USER || 'website@d21softball.org',
    defaultFromName: 'D21 Softball',
    transportOptions: {
      host: process.env.EMAIL_SMTP_HOST ?? 'localhost',
      port: process.env.EMAIL_SMTP_PORT ?? '1025',
      auth: {
        user: process.env.EMAIL_SMTP_USER ?? 'dev',
        pass: process.env.EMAIL_SMTP_PASS ?? 'password',
      },
    },
  }),
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
      defaultToEmail: 'info@d21softball.org',
      beforeEmail: async (emailsToSend, beforeChangeParams) => {
        const { data } = beforeChangeParams
        const { submissionData, formType } = data

        const promises = emailsToSend.map(async (email) => {
          let emailComponent
          switch (formType) {
            case 'contact':
              emailComponent = FormSubmissionEmail({
                email: submissionData.email,
                name: submissionData.name,
              })
              break

            default:
              break
          }

          // Render React component to HTML string
          const html = await render(emailComponent)
          email.html = html

          return email
        })

        // Wait for all emails to be processed
        return Promise.all(promises)
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
          useAsTitle: 'form',
        },
        hooks: {
          afterChange: [() => revalidatePath('/register')],
        },
        fields: ({ defaultFields }) => {
          const formField: Field = {
            name: 'form',
            type: 'select',
            defaultValue: 'contact',
            options: [
              { label: 'Contact', value: 'contact' },
              { label: 'Register', value: 'register' },
            ],
          }
          const rest = defaultFields.filter(
            (field) =>
              'name' in field &&
              field.name !== 'title' &&
              field.name !== 'fields' &&
              field.name !== 'submitButtonLabel',
          )
          return [formField, ...rest]
        },
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
        hooks: {
          beforeValidate: [
            async ({ data, req }) => {
              // Get the form ID from the submission data
              const formId = data?.form

              if (typeof formId === 'string') {
                try {
                  // Fetch the form document to get its type
                  const form = await req.payload.findByID({
                    collection: 'forms',
                    id: formId,
                  })

                  return {
                    ...data,
                    formType: form.form,
                  }
                } catch (error) {
                  console.error('Error fetching form:', error)
                  return data
                }
              }
              return data
            },
          ],
        },
        fields: ({ defaultFields }) => {
          const formField = defaultFields.find((field) => 'name' in field && field.name === 'form')

          return [
            ...(formField ? [formField] : []),
            {
              name: 'formType',
              type: 'text',
              admin: {
                hidden: true,
              },
            },
            {
              name: 'title',
              type: 'text',
              admin: {
                readOnly: true,
              },
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
