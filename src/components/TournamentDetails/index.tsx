import { CalendarDays, CheckCircle, DollarSign, MapPin, Trophy, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Tournament } from '@/payload-types'
import { Button } from '../ui/button'
import Container from '../Container'
import RichText from '../RichText'
import { format } from 'date-fns'
import { Title } from '../Hero/HeroMedium'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel'
import Image from 'next/image'
import { RegisterButton } from './RegisterButton'
import { cn } from '@/utilities/cn'

const images = [
  {
    id: 'f243',
    url: '/placeholder.svg',
    alt: 'Image 1',
    width: 960,
    height: 640,
  },
  {
    id: '2f34f4',
    url: '/placeholder.svg',
    alt: 'Image 2',
    width: 960,
    height: 640,
  },
]

export default function TournamentDetails(details: Tournament) {
  return (
    <Container className="mx-auto max-w-5xl pb-24 pt-12">
      <div className="py-8 sm:py-12">
        <Title text={details.title} heading="h1" />
        <div className="mt-4 flex flex-col gap-1 text-muted-foreground sm:flex-row sm:items-center sm:gap-6">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            <span>
              {format(details.startDate, 'MMM dd, yyyy')} -{' '}
              {format(details.endDate, 'MMM dd, yyyy')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <span>{details.location}</span>
          </div>
        </div>
      </div>
      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
          <TabsTrigger value="info">Tournament Info</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-6">
          {/* Tournament Details */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Tournament Details
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Class</h3>
                    <p className="text-muted-foreground">{details.class}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-muted-foreground">{details.location}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">Price</h3>
                    <p className="text-muted-foreground">${details.price}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold">Start date</h3>
                    <p className="text-muted-foreground">
                      {format(details.startDate, 'MMMM dd, yyyy')}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">End date</h3>
                    <p className="text-muted-foreground">
                      {format(details.endDate, 'MMMM dd, yyyy')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Registration Card */}
            <Card className="flex h-full flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Participating Teams
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {details.teams?.map(({ team, isPaid }) => {
                    if (typeof team === 'string') return null
                    return (
                      <li
                        key={team.id}
                        className="flex items-center justify-between text-pretty rounded-lg bg-brand-secondary p-3 transition-colors hover:bg-brand-secondary/90"
                      >
                        <span className="font-medium text-primary-foreground">
                          {team.title}
                          {team.city ? <p>{team.city}</p> : null}
                        </span>
                        {isPaid ? (
                          <span className="flex items-center rounded-full bg-green-500 px-3 py-1 text-sm font-medium text-white">
                            <CheckCircle className="mr-1 h-4 w-4" />
                            Paid
                          </span>
                        ) : (
                          <RegisterButton teamName={team.title} />
                        )}
                      </li>
                    )
                  })}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <Card className="">
            <CardHeader>
              <CardTitle>About the Tournament</CardTitle>
            </CardHeader>
            <CardContent>
              <RichText content={details.description} enableProse={false} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>Tournament Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {details.games?.map((game, index) => {
                const homeTeam = game.opponents?.find((team) => team.location === 'home')
                const visitorTeam = game.opponents?.find((team) => team.location === 'visitor')

                return (
                  <div key={game.id} className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-semibold">Game {index + 1}</span>
                      <span className="text-sm text-muted-foreground">
                        {game.date ? format(new Date(game.date), 'MMM d, h:mm a') : 'TBD'}
                      </span>
                    </div>
                    <div className="space-y-3 lg:flex lg:items-center lg:gap-4 lg:space-y-0">
                      <div className="flex flex-1 items-center justify-between gap-4 rounded-md bg-muted/50 p-3 lg:flex-col lg:items-center">
                        <span className="font-medium">
                          {typeof homeTeam?.team === 'object' ? homeTeam.team.title : 'TBD'}
                        </span>
                        {homeTeam?.score !== undefined && (
                          <span
                            className={cn(
                              'text-lg font-bold lg:mt-2',
                              homeTeam.isWinner && 'text-green-600',
                            )}
                          >
                            {homeTeam.score}
                          </span>
                        )}
                      </div>
                      <span className="block text-center text-sm font-medium text-muted-foreground lg:text-base">
                        VS
                      </span>
                      <div className="flex flex-1 items-center justify-between gap-4 rounded-md bg-muted/50 p-3 lg:flex-col lg:items-center">
                        <span className="font-medium">
                          {typeof visitorTeam?.team === 'object' ? visitorTeam.team.title : 'TBD'}
                        </span>
                        {visitorTeam?.score !== undefined && (
                          <span
                            className={cn(
                              'text-lg font-bold lg:mt-2',
                              visitorTeam.isWinner && 'text-green-600',
                            )}
                          >
                            {visitorTeam.score}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery">
          <Carousel className="mx-auto w-full max-w-3xl">
            {/* Needs better type checking system */}
            <CarouselContent className="">
              {images.map((image) => (
                <CarouselItem key={image.id}>
                  <Image
                    className="max-h-96 rounded-lg object-cover shadow-lg ring-1 ring-gray-400/10"
                    src={image.url ?? ''}
                    alt={image.alt}
                    width={image.width ?? 960}
                    height={image.height ?? 640}
                    priority={true}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </TabsContent>
      </Tabs>
    </Container>
  )
}
