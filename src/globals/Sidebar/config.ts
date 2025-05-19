import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateSidebar } from './hooks/revalidateSidebar'
import { authenticated } from '@/access/authenticated'
import { editorOrHigher } from '@/access/editorOrHigher'

export const Sidebar: GlobalConfig = {
  slug: 'sidebar',
  access: {
    read: authenticated,
    update: editorOrHigher,
  },
  admin: {
    group: 'Website Builder',
    hideAPIURL: true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      admin: {
        components: {
          RowLabel: '@/fields/link/LinkRowLabel',
        },
      },
      fields: [
        link({
          appearances: false,
          icon: true,
        }),
      ],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [revalidateSidebar],
  },
}
