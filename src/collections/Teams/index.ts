import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { editorOrHigher } from '@/access/editorOrHigher'
import { superAdmin } from '@/access/superAdmin'
import { CollectionConfig } from 'payload'

export const Teams: CollectionConfig = {
  slug: 'teams',
  access: {
    create: editorOrHigher,
    delete: editorOrHigher,
    read: authenticatedOrPublished,
    update: editorOrHigher,
  },
  labels: {
    singular: 'Team',
    plural: 'Teams',
  },
  admin: {
    useAsTitle: 'title',
    hideAPIURL: !superAdmin,
  },
  fields: [
    {
      name: 'title',
      label: 'Team Name',
      type: 'text',
      required: true,
    },
    {
      name: 'city',
      type: 'text',
    },
    {
      name: 'tournaments',
      type: 'join',
      collection: 'tournaments',
      on: 'teams.team',
    }
  ],
}
