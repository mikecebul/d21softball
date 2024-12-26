import Container from '@/components/Container'
import { Description, Title } from '@/components/Hero/HeroMedium'
import { TournamentsBlock as TournamentsBlockType } from '@/payload-types'
import { format } from 'date-fns'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarIcon, MapPinIcon } from 'lucide-react'
import RichText from '@/components/RichText'
import { CTALinks } from '@/components/CTALinks'
import { TwoColumnLayout } from '@/components/TwoColumnLayout'
import { Media } from '@/components/Media'

export const TournamentsBlock = ({
  title,
  description,
  tournaments,
  direction,
  links,
  image,
}: TournamentsBlockType) => {
  return (
    <Container className="space-y-12">
      <TwoColumnLayout direction={direction ?? 'ltr'}>
        <>
          <Title heading="h2" text={title} />
          <Description text={description} />
          <CTALinks links={links ?? []} />
        </>
        {image && typeof image === 'object' && <Media resource={image} className="rounded-lg" />}
      </TwoColumnLayout>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <CardContent className="pb-2">
                  <CardDescription className="text-lg">
                    <span className="flex flex-col">
                      <span className="flex items-center gap-2">
                        <CalendarIcon className="size-4" />
                        <span>{format(tournament.startDate, 'MMMM do, yyyy')}</span> -{' '}
                        <span>{format(tournament.endDate, 'MMMM do, yyyy')}</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPinIcon className="size-4" />
                        <span>{tournament.location}</span>
                      </span>
                    </span>
                  </CardDescription>
                </CardContent>
                <CardContent className="">
                  <RichText content={tournament.description} />
                </CardContent>
              </Card>
            )
          })}
      </div>
    </Container>
  )
}
