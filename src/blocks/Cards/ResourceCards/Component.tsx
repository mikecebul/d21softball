import { CardGrid } from '@/components/Cards/CardGrid'
import { CMSLink } from '@/components/Link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ResourceCardsType } from '@/payload-types'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const ResourceCardsBlock = async ({ showAll, resources, link }: ResourceCardsType) => {

  const payload = await getPayload({ config: configPromise })
  const { docs: fetchedCards } = await payload.find({
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
    sort: "-createdAt",
  })

  const cards = showAll ? fetchedCards : resources

  return (
    <section className='space-y-12'>
      <CardGrid>
        {cards && cards.map((card) => {
          if (typeof card === 'string') return null
          const { description, image, link, title } = card
          return (
            <CMSLink {...link} appearance="card">
              <Card className="group flex h-full max-w-xs flex-col bg-accent/60 px-0 py-0 text-left shadow hover:bg-accent">
                <CardContent className="overflow-hidden rounded-t-lg p-0">
                  {typeof image === 'object' && (
                    <Image
                      src={image?.url ?? ''}
                      alt={image?.alt ?? ''}
                      width={800}
                      height={800}
                      className="max-h-60 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                  )}
                </CardContent>
                <CardHeader>
                  <CardTitle className="text-pretty pb-1 capitalize">{title}</CardTitle>
                  {description ? <CardDescription className="">{description}</CardDescription> : null}
                </CardHeader>
              </Card>
            </CMSLink>
          )
        }
        )}
      </CardGrid>
      {(!showAll && link) && (
        <div className='flex w-full items-center justify-center'>
          <CMSLink {...link} size="xl" />
        </div>
      )}
    </section>
  )
}
