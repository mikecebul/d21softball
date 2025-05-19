// import { linkGroup } from '@/fields/link/linkGroup'
// import { Block } from 'payload'

// export const Tournaments: Block = {
//   slug: 'tournaments',
//   labels: {
//     singular: 'Tournaments Block',
//     plural: 'Tournaments Blocks',
//   },
//   interfaceName: 'TournamentsBlock',
//   fields: [
//     {
//       name: 'direction',
//       type: 'radio',
//       defaultValue: 'ltr',
//       options: [
//         { label: 'Left to Right', value: 'ltr' },
//         { label: 'Right to Left', value: 'rtl' },
//       ],
//     },
//     {
//       name: 'title',
//       type: 'text',
//       required: true,
//     },
//     {
//       name: 'description',
//       type: 'textarea',
//       required: true,
//     },
//     linkGroup({
//       overrides: {
//         maxRows: 2,
//         admin: {
//           components: {
//             RowLabel: '@/fields/link/LinkRowLabel',
//           },
//         },
//       },
//     }),
//     {
//       name: 'image',
//       type: 'upload',
//       relationTo: 'media',
//     },
//     {
//       name: 'tournaments',
//       type: 'relationship',
//       relationTo: 'tournaments',
//       hasMany: true,
//       maxRows: 3,
//       admin: {
//         description: 'Select up to 3 tournaments to display',
//       },
//     },
//   ],
// }
