import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { editorOrHigher } from '@/access/editorOrHigher'
import { superAdmin } from '@/access/superAdmin'
import { CollectionConfig } from 'payload'

export const CommitteeMembers: CollectionConfig = {
  slug: 'committee-members',
  access: {
    create: editorOrHigher,
    delete: editorOrHigher,
    read: authenticatedOrPublished,
    update: editorOrHigher,
  },
  labels: {
    singular: 'Committee Member',
    plural: 'Committee Members',
  },
  admin: {
    group: 'Softball',
    hideAPIURL: !superAdmin,
    useAsTitle: 'name',
  },
  orderable: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'position',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
  ],
}
