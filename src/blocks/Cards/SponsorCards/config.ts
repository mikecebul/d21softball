import { Block } from 'payload'

export const SponsorCards: Block = {
  slug: 'sponsorCards',
  interfaceName: 'SponsorCardsType',
  labels: {
    singular: 'Sponsor Cards',
    plural: 'Many Sponsor Cards',
  },
  fields: [
    {
      name: 'sponsors',
      type: 'relationship',
      relationTo: 'sponsors',
      hasMany: true,
      minRows: 1,
    },
  ],
}
