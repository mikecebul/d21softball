import Container from '@/components/Container'
import RichText from '@/components/RichText'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { TournamentCardsBlock as TournamentCardsBlockType } from '@/payload-types'
import { format } from 'date-fns'
import { CalendarIcon, MapPinIcon } from 'lucide-react'

export const TournamentCardsBlock = ({ tournaments }: TournamentCardsBlockType) => {
  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(tournaments) &&
          tournaments.length > 0 &&
          tournaments.map((tournament) => {
            if (typeof tournament !== 'object') {
              return null
            }
            return (
              <Card key={tournament.id} className="col-span-1 bg-green-50/50">
                <CardHeader className="">
                  <CardTitle>{tournament.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="font-semibold pb-4">
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
                  <RichText content={tournament.description} />
                </CardContent>
              </Card>
            )
          })}
      </div>
    </Container>
  )
}
