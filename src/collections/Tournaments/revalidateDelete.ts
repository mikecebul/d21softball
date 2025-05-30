import { Tournament } from '@/payload-types'
import { revalidatePath, revalidateTag } from 'next/cache'
import { CollectionAfterDeleteHook } from 'payload'

export const revalidateDelete: CollectionAfterDeleteHook<Tournament> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = doc?.slug === 'home' ? '/' : `/${doc?.slug}`
    revalidatePath(path)
    revalidateTag('sitemap')
  }

  return doc
}
