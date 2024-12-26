import { Block } from 'payload'

export const TournamentCards: Block = {
  slug: 'tournamentCards',
  interfaceName: 'TournamentCardsBlock',
  labels: {
    singular: 'Tournament Cards',
    plural: 'Tournament Card Blocks',
  },
  fields: [
    {
      name: 'tournaments',
      type: 'relationship',
      relationTo: 'tournaments',
      hasMany: true,
      minRows: 3,
      maxRows: 3,
      admin: {
        description: 'Select up to 3 Tournaments to display',
      },
    },
  ],
}
