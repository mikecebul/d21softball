'use client'

import { CalendarDays, CheckCircle, MapPin, Trophy, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import type { Tournament } from '@/payload-types'
import Container from '../Container'
import { RichText } from '../RichText'
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
import { cn } from '@/utilities/cn'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { Separator } from '../ui/separator'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordian'

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

export default function TournamentDetails({ details }: { details: Tournament }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'info')

  // Listen for URL changes and update tab state
  useEffect(() => {
    const tab = searchParams.get('tab') || 'info'
    setActiveTab(tab)
  }, [searchParams])

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value === 'info') {
      params.delete('tab') // Remove tab param for default tab
    } else {
      params.set('tab', value)
    }

    // Use push instead of replace to add to browser history
    const queryString = params.toString()
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname
    router.push(newUrl, { scroll: false })
  }

  const handlePayment = (teamName: string) => {
    console.log(`Forwarding to Stripe Checkout for team: ${teamName}`)
    alert(`Redirecting to Stripe Checkout for ${teamName}`)
  }

  return (
    <Container className="pb-16">
      <div className="py-8 sm:py-12">
        <Title text={details.title} heading="h1" />
        <div className="text-muted-foreground mt-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-6">
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
      <Tabs value={activeTab} className="space-y-6" onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
          <TabsTrigger value="info">Tournament Info</TabsTrigger>
          <TabsTrigger value="games">Games</TabsTrigger>
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
              <CardHeader>
                <CardTitle>About the Tournament</CardTitle>
              </CardHeader>
              <CardContent>
                <RichText data={details.description} enableProse={false} />
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
                  {details.teams && details.teams.length > 1 ? (
                    details.teams?.map(({ team, isPaid }) => {
                      if (typeof team === 'string') return null
                      return (
                        <li
                          key={team.id}
                          className="bg-brand-secondary hover:bg-brand-secondary/90 flex items-center justify-between rounded-lg p-3 text-pretty transition-colors"
                        >
                          <span className="text-primary-foreground font-medium">
                            {team.title}
                            {team.city ? <p>{team.city}</p> : null}
                          </span>
                          {isPaid ? (
                            <span className="flex items-center rounded-full bg-green-500 px-3 py-1 text-sm font-medium text-white">
                              <CheckCircle className="mr-1 h-4 w-4" />
                              Paid
                            </span>
                          ) : (
                            <Button
                              onClick={() => handlePayment(team.title)}
                              variant="brand"
                              size="fit"
                            >
                              Pay ${details.price}
                            </Button>
                          )}
                        </li>
                      )
                    })
                  ) : (
                    <p className="text-muted-foreground text-xl">TBD</p>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          {/* <Card className="w-fit">
            <CardHeader>
              <CardTitle>About the Tournament</CardTitle>
            </CardHeader>
            <CardContent>
              <RichText content={details.description} enableProse={false} />
            </CardContent>
          </Card> */}
        </TabsContent>

        <TabsContent value="games">
          <Card>
            <CardHeader>
              <CardTitle>Games</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {details.games?.map(({ id, date, homeTeam, visitorTeam, highlights }, index) => (
                <div key={id} className="rounded-lg border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold">Game {index + 1}</span>
                    <span className="text-muted-foreground text-sm">
                      {date ? format(new Date(date), 'MMM d, h:mm a') : 'TBD'}
                    </span>
                  </div>
                  <div className="flex items-end gap-4 space-y-3 lg:gap-8">
                    <div className="bg-muted/50 flex flex-1 flex-col items-center justify-between gap-4 rounded-md p-3">
                      <span className="text-center leading-5 font-semibold text-pretty lg:text-lg">
                        {typeof homeTeam?.team === 'object' ? homeTeam.team.title : 'TBD'}
                      </span>
                      {homeTeam?.score !== undefined && (
                        <span
                          className={cn(
                            'text-lg font-semibold lg:mt-2',
                            homeTeam.score &&
                              visitorTeam.score &&
                              homeTeam.score > visitorTeam.score &&
                              'text-green-600',
                          )}
                        >
                          {homeTeam.score}
                        </span>
                      )}
                    </div>
                    <div className="bg-muted/50 flex flex-1 flex-col items-center justify-between gap-4 rounded-md p-3">
                      <span className="text-center leading-5 font-semibold text-pretty lg:text-lg">
                        {typeof visitorTeam?.team === 'object' ? visitorTeam.team.title : 'TBD'}
                      </span>
                      {visitorTeam?.score !== undefined && (
                        <span
                          className={cn(
                            'text-lg font-semibold lg:mt-2',
                            homeTeam.score &&
                              visitorTeam.score &&
                              homeTeam.score < visitorTeam.score &&
                              'text-green-600',
                          )}
                        >
                          {visitorTeam.score}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-muted-foreground -mt-6 block text-center text-sm font-medium lg:text-base">
                    VS
                  </div>
                  <div>
                    {highlights ? (
                      <>
                        <Separator className="my-4" />
                        <Accordion type="single" collapsible>
                          <AccordionItem value="item-1" className="border-none">
                            <AccordionTrigger>View Highlights</AccordionTrigger>
                            <AccordionContent>
                              <RichText data={highlights} enableProse={false} />
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </>
                    ) : null}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery">
          <Carousel className="ml-12 w-full max-w-4xl">
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
