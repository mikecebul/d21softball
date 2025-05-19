import React, { cache } from 'react'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { Metadata } from 'next'

import { getPayload } from 'payload'
import { generateMeta } from '@/utilities/generateMeta'
import TournamentDetails from '@/components/TournamentDetails'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const details = await payload.find({
    collection: 'tournaments',
    draft: false,
    limit: 1000,
    overrideAccess: true,
  })

  return details.docs?.map(({ slug }) => ({ slug })) || []
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}
export default async function UpdatePage({ params: paramsPromise }: Args) {
  const { slug = 'home' } = await paramsPromise
  const url = '/tournaments/' + slug
  const details = await queryUpdateBySlug({ slug })

  if (!details) return <PayloadRedirects url={url} />

  return (
    <main className="@container">
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />
      <TournamentDetails details={details} />
    </main>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  if (!slug) {
    return {
      title: 'Tournament',
      description: 'Stay up to date',
    }
  }
  const details = await queryUpdateBySlug({ slug })

  return generateMeta({ doc: details })
}

const queryUpdateBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const { docs: details } = await payload.find({
    collection: 'tournaments',
    draft,
    limit: 1,
    depth: 5,
    overrideAccess: true,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return details?.[0] || null
})
