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
import { UpdateCardsType } from '@/payload-types'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/utilities/cn'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const UpdateCardsBlock = async ({ allUpdates, updates }: UpdateCardsType) => {
  const payload = await getPayload({ config: configPromise })
  const { docs: fetchedUpdates } = await payload.find({
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
  })

  const cards = allUpdates ? fetchedUpdates : updates

  return (
    <div className="grid gap-6 lg:grid-cols-2 2xl:grid-cols-3">
      {cards &&
        cards.map(({ title, slug, content, dateOrDescription, description, updatedAt, id }) => (
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
        ))}
    </div>
  )
}
