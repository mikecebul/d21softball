import { Block } from 'payload'
import { TwoColumnLayout } from '@/blocks/layouts/TwoColumnLayout/config'
import { TitleBlock } from '@/blocks/Title/config'
export const HeroLayout: Block = {
    slug: 'heroLayout',
    interfaceName: 'HeroLayoutBlockType',
    labels: {
        singular: 'Hero Layout',
        plural: 'Hero Layouts',
    },
    fields: [
        {
            name: 'nested',
            type: 'checkbox',
            defaultValue: false,
        },
        {
            name: 'blocks',
            type: 'blocks',
            maxRows: 1,
            blocks: [TitleBlock, TwoColumnLayout],
        },
    ],
}