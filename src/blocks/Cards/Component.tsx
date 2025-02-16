import {
  Card,
  CardContent,
  CardDescriptionDiv,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import RichText from '@/components/RichText'
import { CardsBlockType, Resource, Update } from '@/payload-types'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/utilities/cn'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CMSLink } from '@/components/Link'
import { LinkCard } from '@/components/Cards/LinkCard'

export const CardsBlock = async ({ cardType, updates, showAll, resources, showLink, link }: CardsBlockType) => {
  const payload = await getPayload({ config: configPromise })
  const { docs: fetchedCards } = await payload.find({
    collection: cardType,
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

  const cards = showAll ? fetchedCards : updates ?? resources

  return (
    <section className="space-y-12">
      <div className="grid gap-12 lg:grid-cols-2 2xl:grid-cols-3">
        {cards &&
          cards.map((card: any) => {
            if (typeof card !== 'object') return null
            if (cardType === 'resources') {
              return <LinkCard key={card.id} card={card} />
            }
            if (cardType === 'updates') {
              return <UpdateCard key={card.id} card={card} />
            }
          })}
      </div>
      {showLink && link && <div className='flex w-full items-center justify-center'>
        <CMSLink {...link} size="xl" />
      </div>}
    </section>
  )
}

const UpdateCard = async ({ card }: { card: Update }) => {
  const { id, title, dateOrDescription, description, updatedAt, slug, content } = card
  return (
    <Card className="flex w-full max-w-2xl flex-col shadow-lg" key={id}>
      <CardHeader className="">
        <CardTitle className="text-3xl">{title}</CardTitle>
        <CardDescriptionDiv>
          {dateOrDescription === 'description' && <p>{description}</p>}
          {dateOrDescription === 'date' && updatedAt && (
            <div className="mt-1 flex items-center">
              <CalendarIcon className="mr-1 h-4 w-4" />
              {format(updatedAt, 'MMMM d, yyyy')}
            </div>
          )}
        </CardDescriptionDiv>
      </CardHeader>
      <CardContent className="flex-1">
        <RichText content={content} className="" truncateLines />
      </CardContent>
      <CardFooter>
        <Link
          href={`/updates/${slug}`}
          className={cn('w-full', buttonVariants({ variant: 'outline' }))}
        >
          Read Entire Update
        </Link>
      </CardFooter>
    </Card>
  )
}