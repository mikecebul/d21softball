import React, { cache } from 'react'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { Metadata } from 'next'

import { getPayload } from 'payload'
import { generateMeta } from '@/utilities/generateMeta'
import { UpdateBlock } from '@/components/Update'
import { Main } from '@/components/Main'
import { PayloadAdminBar } from 'payload-admin-bar'
import { baseUrl } from '@/utilities/baseUrl'
import { AdminBarContext } from '@/components/AdminBar/AdminBarContext'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const update = await payload.find({
    collection: 'updates',
    draft: false,
    limit: 1000,
    overrideAccess: true,
  })

  return update.docs?.map(({ slug }) => ({ slug })) || []
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}
export default async function UpdatePage({ params: paramsPromise }: Args) {
  const { slug = 'home' } = await paramsPromise
  const url = '/updates/' + slug
  const update = await queryUpdateBySlug({ slug })

  if (!update) return <PayloadRedirects url={url} />

  return (
    <Main>
      {/* Allows redirects for valid pages too */}
      <AdminBarContext pageId={update.id} collection="updates" />
      <PayloadRedirects disableNotFound url={url} />
      <UpdateBlock update={update} />
    </Main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  if (!slug) {
    return {
      title: 'Update',
      description: 'Stay up to date',
    }
  }
  const update = await queryUpdateBySlug({ slug })

  return generateMeta({ doc: update })
}

const queryUpdateBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const { docs: updates } = await payload.find({
    collection: 'updates',
    draft,
    limit: 1,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return updates?.[0] || null
})
