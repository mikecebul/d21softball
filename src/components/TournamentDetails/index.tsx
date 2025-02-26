import { CalendarDays, MapPin, Trophy, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tournament } from "@/payload-types";
import { Button } from "../ui/button";
import Container from "../Container";
import RichText from "../RichText";
import { format } from "date-fns";

export default function TournamentDetails(details: Tournament) {
  return (
    <Container className="pt-12 pb-24">
      <div className="py-8 sm:py-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{details.title}</h1>
        <div className="flex flex-col gap-2 mt-4 text-muted-foreground sm:flex-row sm:items-center sm:gap-6">
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
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="info">Tournament Info</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-6">
          {/* Tournament Details */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Register Your Team
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">Select Team</h3>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your team" />
                    </SelectTrigger>
                    <SelectContent>
                      {details.teams?.map((team) => (
                        <SelectItem key={team.id} value={team.name.toLowerCase()}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-red-600 hover:bg-red-700">Continue Registration</Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <Card>
            <CardHeader>
              <CardTitle>About the Tournament</CardTitle>
            </CardHeader>
            <CardContent className="prose-sm prose max-w-none">
              <RichText content={details.description} />
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
      </Tabs>
    </Container>
  )
}