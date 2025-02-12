import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Resource, ResourceCardsType } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CMSLink } from '@/components/Link'
import Image from 'next/image'

export const ResourceCardsBlock = async ({ allResources, resources }: ResourceCardsType) => {
  const payload = await getPayload({ config: configPromise })
  const { docs: fetchedResources } = await payload.find({
    collection: 'resources',
    draft: false,
    limit: 1000,
    overrideAccess: true,
    pagination: false,
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  const cards = allResources ? fetchedResources : resources

  return (
    <div className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
      {cards &&
        cards.map((card) => {
          if (!card || typeof card === 'string') return null
          return <ResourceCard key={card.id} card={card} />
        })}
    </div>
  )
}

export const ResourceCard = ({ card }: { card: Resource }) => {
  return (
    <CMSLink {...card.link} appearance="card">
      <Card className="group flex h-full max-w-lg flex-col bg-accent/60 px-0 py-0 text-left shadow hover:bg-accent">
        <CardContent className="overflow-hidden rounded-t-lg p-0">
          {typeof card.image === 'object' && (
            <Image
              src={card.image?.url ?? ''}
              alt={card.image?.alt ?? ''}
              width={800}
              height={800}
              className="max-h-60 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          )}
        </CardContent>
        <CardHeader>
          <CardTitle className="text-pretty pb-1 capitalize">{card.title}</CardTitle>
          <CardDescription className="">{card.description}</CardDescription>
        </CardHeader>
      </Card>
    </CMSLink>
  )
}