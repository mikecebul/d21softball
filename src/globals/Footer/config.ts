import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import { superAdmin } from '@/access/superAdmin'
import { authenticated } from '@/access/authenticated'
import { editorOrHigher } from '@/access/editorOrHigher'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: authenticated,
    update: editorOrHigher,
  },
  admin: {
    group: 'Website Builder',
    hideAPIURL: !superAdmin
  },
  fields: [
    {
      name: 'pageLinks',
      type: 'array',
      label: 'Page Links',
      fields: [
        link({
          appearances: false,
        }),
      ],
      admin: {
        components: {
          RowLabel: '@/fields/link/LinkRowLabel',
        },
      },
    },
    {
      name: 'showContact',
      type: 'checkbox',
      defaultValue: true,
      label: 'Add column for business contact information.',
    },
    {
      name: 'showDivisionLogo',
      type: 'checkbox',
      label: 'Add Division Logo to footer.',
      defaultValue: true,
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
