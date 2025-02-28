import { CalendarDays, MapPin, Trophy, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tournament } from "@/payload-types";
import { Button } from "../ui/button";
import Container from "../Container";
import RichText from "../RichText";
import { format } from "date-fns";
import { Title } from "../Hero/HeroMedium";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import Image from "next/image";

const images = [
  {
    id: "f243",
    url: "/placeholder.svg",
    alt: "Image 1",
    width: 960,
    height: 640,
  },
  {
    id: "2f34f4",
    url: "/placeholder.svg",
    alt: "Image 2",
    width: 960,
    height: 640,
  },
]

export default function TournamentDetails(details: Tournament) {
  return (
    <Container className="max-w-5xl pt-12 pb-24 mx-auto">
      <div className="py-8 sm:py-12">
        <Title text={details.title} heading="h1" />
        <div className="flex flex-col gap-1 mt-4 text-muted-foreground sm:flex-row sm:items-center sm:gap-6">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5" />
            <span>{format(details.startDate, 'MMM dd, yyyy')} - {format(details.endDate, 'MMM dd, yyyy')}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span>{details.location}</span>
          </div>
        </div>
      </div>
      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
          <TabsTrigger value="info" >Tournament Info</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-6">
          {/* Tournament Details */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
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
                    <p className="text-muted-foreground">{format(details.startDate, 'MMMM dd, yyyy')}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold">End date</h3>
                    <p className="text-muted-foreground">{format(details.endDate, 'MMMM dd, yyyy')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Registration Card */}
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Register Your Team
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Select Team</h3>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your team" />
                    </SelectTrigger>
                    <SelectContent>
                      {details.teams?.map(({ team }) => {
                        if (typeof team === 'string') return null;
                        return (
                          <SelectItem key={team?.id} value={team?.title.toLowerCase()}>
                            {team?.title}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardContent className="mt-auto">
                <Button className="lg:w-full" variant="brand">Continue To Registration</Button>
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
              <CardTitle>Tournament Standings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <div className="grid grid-cols-4 gap-4 p-4 font-semibold border-b bg-muted">
                  <div>Position</div>
                  <div className="col-span-2">Team</div>
                  <div>Record</div>
                </div>
                {/* {results.map((result) => (
              <div key={result.team} className="grid grid-cols-4 gap-4 p-4 border-b last:border-0">
                <div className="font-semibold">{result.position}</div>
                <div className="col-span-2">{result.team}</div>
                <div className="text-muted-foreground">
                  {result.wins}-{result.losses}
                </div>
              </div>
            ))} */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery">
          <Carousel
            className='w-full max-w-3xl mx-auto'
          >
            {/* Needs better type checking system */}
            <CarouselContent className=''>
              {images.map((image) => (
                <CarouselItem key={image.id}>
                  <Image
                    className="object-cover rounded-lg shadow-lg ring-1 ring-gray-400/10 max-h-96"
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
    </Container >
  )
}