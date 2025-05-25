'use client'

import { ReactNode, createContext, useContext, useState } from 'react'

type PageContextType = {
  pageId: string | null
  collection: string | null
  setPageId: (id: string | null) => void
  setCollection: (collection: string | null) => void
}

const PageContext = createContext<PageContextType>({
  pageId: null,
  collection: null,
  setPageId: () => null,
  setCollection: () => null,
})

export const usePageContext = () => useContext(PageContext)

type PageProviderProps = {
  pageId?: string | null
  collection?: string | null
  children: ReactNode
}

export const PageProvider = ({ pageId = null, collection = null, children }: PageProviderProps) => {
  const [currentPageId, setPageId] = useState<string | null>(pageId)
  const [currentCollection, setCollection] = useState<string | null>(collection)

  return (
    <PageContext.Provider
      value={{
        pageId: currentPageId,
        collection: currentCollection,
        setPageId,
        setCollection,
      }}
    >
      {children}
    </PageContext.Provider>
  )
}
