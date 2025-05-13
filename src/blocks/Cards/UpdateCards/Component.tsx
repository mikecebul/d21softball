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
import { Update, UpdateCardsType } from '@/payload-types'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/utilities/cn'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { CardGrid } from '@/components/Cards/CardGrid'
import { CMSLink } from '@/components/Link'

export const UpdateCardsBlock = async ({ showAll, updates, link }: UpdateCardsType) => {
  const payload = await getPayload({ config: configPromise })
  const { docs: fetchedCards } = await payload.find({
    collection: 'updates',
    draft: false,
    limit: 1000,
    overrideAccess: true,
    pagination: false,
    where: {
      _status: {
        equals: 'published',
      },
    },
    sort: '-createdAt',
  })

  const cards = showAll ? fetchedCards : updates

  return (
    <CardGrid>
      {cards &&
        cards.map((card) => {
          if (typeof card === 'string') return null
          return <UpdateCard key={card.id} {...card} />
        })}
      {!showAll && link && (
        <div className="flex w-full items-center justify-center">
          <CMSLink {...link} size="xl" />
        </div>
      )}
    </CardGrid>
  )
}

export const UpdateCard = ({ description, content, title, updatedAt, slug, id }: Update) => {
  return (
    <Card className="flex w-full max-w-xl flex-col shadow-lg 2xl:items-start" key={id}>
      <CardHeader className="">
        <CardTitle className="text-3xl">{title}</CardTitle>
        <CardDescriptionDiv>
          <p>{description}</p>
          <div className="mt-1 flex items-center">
            <CalendarIcon className="mr-1 h-4 w-4" />
            {format(updatedAt, 'MMMM d, yyyy')}
          </div>
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
