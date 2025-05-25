'use client'

import { usePageContext } from '@/providers/PageProvider'
import { useEffect } from 'react'

export const AdminBarContext = ({ pageId, collection }: { pageId: string; collection: string }) => {
  const { setPageId, setCollection } = usePageContext()

  useEffect(() => {
    if (pageId) {
      setPageId(pageId)
    }
    if (collection) {
      setCollection(collection)
    }
  }, [pageId, setPageId, collection, setCollection])

  return null
}
