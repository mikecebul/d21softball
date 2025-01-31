import { LinksBlock } from '@/payload-types'

export type NonNullableLinkCards = Exclude<LinksBlock['cards'], null | undefined>
export type LinkCardType = NonNullableLinkCards[number]
