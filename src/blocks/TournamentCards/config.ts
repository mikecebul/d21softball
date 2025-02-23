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
      minRows: 1,
      filterOptions: () => {
        const date = new Date(new Date().getFullYear(), 0, 1) // January 1st of the current year
        return {
          // Filter out tournaments that happened before the current year
          startDate: { greater_than_equal: date },
        }
      }
    },
  ],
}
