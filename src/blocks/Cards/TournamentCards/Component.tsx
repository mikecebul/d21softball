import { RichText } from '@/components/RichText'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { TournamentCardsBlock as TournamentCardsBlockType } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { format } from 'date-fns'
import { CalendarIcon, MapPinIcon } from 'lucide-react'
import Link from 'next/link'

export const TournamentCardsBlock = ({ tournaments }: TournamentCardsBlockType) => {
  return (
    <div className="@8xl:grid-cols-3 grid grid-cols-1 gap-6 @5xl:grid-cols-2">
      {Array.isArray(tournaments) &&
        tournaments.length > 0 &&
        tournaments.map((tournament) => {
          if (typeof tournament !== 'object') {
            return null
          }
          return (
            <Card key={tournament.id} className="col-span-1">
              <CardHeader className="">
                <CardTitle>{tournament.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="pb-4 font-semibold">
                  <span className="flex items-center gap-2">
                    <CalendarIcon className="size-4" />
                    <span>{format(tournament.startDate, 'MMMM do, yyyy')}</span> -{' '}
                    <span>{format(tournament.endDate, 'MMMM do, yyyy')}</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPinIcon className="size-4" />
                    <span>{tournament.location}</span>
                  </span>
                </div>
                <RichText data={tournament.description} />
              </CardContent>
              <CardFooter>
                <Link
                  href={`/tournaments/${tournament.slug}`}
                  className={cn('w-full', buttonVariants({ variant: 'brand', size: 'lg' }))}
                >
                  Details
                </Link>
              </CardFooter>
            </Card>
          )
        })}
    </div>
  )
}
