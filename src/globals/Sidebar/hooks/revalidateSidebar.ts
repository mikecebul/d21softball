import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

export const revalidateSidebar: GlobalAfterChangeHook = ({ doc, req }) => {
  const { payload } = req

  payload.logger.info(`Revalidating Sidebar`)

  if (req.headers['X-Payload-Migration'] !== 'true') {
    revalidatePath('/(payload)', 'layout')
    revalidatePath('/(frontend)', 'layout')
  }

  return doc
}
