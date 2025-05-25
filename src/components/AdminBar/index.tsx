'use client'

import { usePageContext } from '@/providers/PageProvider'
import { baseUrl } from '@/utilities/baseUrl'
import { PayloadAdminBar } from 'payload-admin-bar'

export const AdminBar = () => {
  const { pageId, collection } = usePageContext()
  return (
    <PayloadAdminBar
      cmsURL={baseUrl}
      collection={collection ?? 'pages'}
      id={pageId ?? undefined}
      logo={<p>Dashboard</p>}
      style={{
        position: 'sticky',
        paddingLeft: '2rem',
        paddingRight: '2rem',
      }}
    />
  )
}
