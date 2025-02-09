import type { CollectionAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'
import { Update } from '@/payload-types'

export const revalidateUpdate: CollectionAfterChangeHook<Update> = ({ doc, previousDoc, req }) => {
  if (doc._status === 'published') {
    const path = `/updates/${doc.slug}`

    if (req.headers['X-Payload-Migration'] !== 'true') {
      req.payload.logger.info(`Revalidating page at path: ${path}`)
      revalidatePath(path)
      revalidateTag('sitemap')
    }
  }

  // If the page was previously published, we need to revalidate the old path
  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const oldPath = `/${previousDoc.slug}`

    if (req.headers['X-Payload-Migration'] !== 'true') {
      req.payload.logger.info(`Revalidating old page at path: ${oldPath}`)
      revalidatePath(oldPath)
      revalidateTag('sitemap')
    }
  }

  return doc
}
