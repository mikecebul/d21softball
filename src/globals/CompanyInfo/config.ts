import { authenticated } from '@/access/authenticated'
import { editorOrHigher } from '@/access/editorOrHigher'
import { superAdmin } from '@/access/superAdmin'
import { link } from '@/fields/link'
import { revalidatePath } from 'next/cache'
import { GlobalConfig } from 'payload'

export const CompanyInfo: GlobalConfig = {
  slug: 'company-info',
  label: 'Company Info',
  access: {
    read: authenticated,
    update: editorOrHigher,
  },
  admin: {
    hideAPIURL: !superAdmin,
    group: 'Website Builder',
  },
  hooks: {
    afterChange: [
      ({ req }) => {
        if (req.headers['X-Payload-Migration'] !== 'true') {
          revalidatePath('/(payload)', 'layout')
          revalidatePath('/(frontend)', 'layout')
        }
      },
    ],
  },
  fields: [
    {
      name: 'contact',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              admin: { width: '50%' },
            },
            {
              name: 'email',
              label: 'Email',
              type: 'text',
              defaultValue: 'info@cvxjrgolf.org',
              admin: { width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'phone',
              label: 'Phone Number',
              type: 'text',
              defaultValue: '(231) 547-1144',
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },
    {
      name: 'social',
      type: 'array',
      admin: {
        components: {
          RowLabel: '@/globals/CompanyInfo/SocialRowLabel',
        },
      },
      fields: [
        {
          name: 'platform',
          type: 'select',
          options: [{ label: 'Facebook', value: 'Facebook' }],
          defaultValue: 'Facebook',
        },
        link({
          appearances: false,
        }),
      ],
    },
  ],
}
