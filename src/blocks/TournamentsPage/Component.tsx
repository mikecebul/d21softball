import Container from '@/components/Container'
import {
  Card,
  CardContent,
  CardDescriptionDiv,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CalendarIcon, CreditCardIcon, MapPinIcon } from 'lucide-react'
import { format } from 'date-fns'
import {RichText} from '@/components/RichText'
import { Description, Title } from '@/components/Hero/HeroMedium'
import { TournamentsPageType } from '@/payload-types'
import Link from 'next/link'
import { cn } from '@/utilities/cn'
import { buttonVariants } from '@/components/ui/button'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export const TournamentsPageBlock = async ({
  announcements,
  description,
  title,
  tournaments,
  showAll,
}: TournamentsPageType) => {
  const date = new Date(new Date().getFullYear(), 0, 1) // January 1st of the current year

  const payload = await getPayload({ config: configPromise })
  const { docs: fetchedTournaments } = await payload.find({
    collection: 'tournaments',
    draft: false,
    limit: 1000,
    overrideAccess: true,
    pagination: false,
    where: {
      and: [
        {
          _status: {
            equals: 'published',
          },
        },
        {
          startDate: { greater_than_equal: date },
        },
      ],
    },
    sort: '-createdAt',
  })

  const cards = showAll ? fetchedTournaments : tournaments
  return (
    <Container className="space-y-16">
      <div className="space-y-8">
        <div className={cn('flex flex-col gap-y-4')}>
          <Title text={title} heading="h1" />
          {description && <Description text={description} />}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {Array.isArray(cards) &&
            cards.length > 0 &&
            cards.map((tournament) => {
              if (typeof tournament === 'string') {
                return null
              }
              const hasUnpaidTeams = tournament.teams?.some((team) => !team.isPaid)
              return (
                <Card key={tournament.id} className="col-span-1 flex h-full flex-col">
                  <CardHeader className="">
                    <CardTitle>{tournament.title}</CardTitle>
                    <CardDescriptionDiv className="pt-2">
                      <span className="flex items-center gap-2">
                        <CalendarIcon className="size-4" />
                        <span>{format(tournament.startDate, 'MMMM dd, yyyy')}</span> -{' '}
                        <span>{format(tournament.endDate, 'MMMM dd, yyyy')}</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPinIcon className="size-4" />
                        <span>{tournament.location}</span>
                      </span>
                      <span
                        className={cn('flex items-center gap-2', {
                          'select-none opacity-0': !hasUnpaidTeams,
                        })}
                      >
                        <CreditCardIcon className="size-4" />
                        <span className="text-brand">{`Registration ${hasUnpaidTeams ? 'open' : 'closed'}`}</span>
                      </span>
                    </CardDescriptionDiv>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <RichText data={tournament.description} className="line-clamp-5" />
                  </CardContent>
                  <CardFooter className="mt-auto">
                    <Link
                      href={`/tournaments/${tournament.slug}`}
                      className={cn(
                        buttonVariants({ variant: 'brandSecondaryOutline' }),
                        'md:w-full',
                      )}
                    >
                      View Tournament
                    </Link>
                  </CardFooter>
                </Card>
              )
            })}
        </div>
      </div>
      {announcements && announcements.length > 0 && (
        <div className="space-y-8">
          <Title text="Announcements" heading="h2" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {announcements?.map((announcement) => {
              if (typeof announcement !== 'object') return null
              return (
                <Card key={announcement.id} className="mb-4">
                  <CardHeader>
                    <CardTitle>{announcement.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="">
                      <RichText data={announcement.description} />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </Container>
  )
}
