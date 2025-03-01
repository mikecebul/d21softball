import type { Metadata } from 'next'

import type { Page, Tournament, Update } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { baseUrl } from './baseUrl'

export const generateMeta = async (args: { doc: Page | Update | Tournament }): Promise<Metadata> => {
  const { doc } = args || {}

  const ogImage =
    'meta' in doc &&
      typeof doc?.meta?.metadata?.image === 'object' &&
      !!doc.meta.metadata.image &&
      typeof doc.meta.metadata.image.sizes?.meta === 'object' &&
      'url' in doc.meta.metadata.image.sizes.meta
      ? process.env.NEXT_PUBLIC_SERVER_URL !== 'localhost:3000'
        ? doc.meta.metadata.image.sizes.meta.url
        : `${baseUrl}${doc.meta.metadata.image.url}`
      : '/header-usa-softball-logo.png'

  const title = 'meta' in doc && doc?.meta?.metadata?.title
    ? doc.meta.metadata.title + ' | D21 Softball'
    : 'D21 Softball'

  return {
    description: 'meta' in doc ? doc.meta?.metadata?.description : undefined,
    openGraph: mergeOpenGraph({
      description: 'meta' in doc ? doc.meta?.metadata?.description || '' : '',
      images: ogImage
        ? [
          {
            url: ogImage,
          },
        ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
