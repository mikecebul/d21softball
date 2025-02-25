'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CalendarIcon, FilterIcon, ArchiveIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function TournamentsPage() {
  const [filterType, setFilterType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredUpcomingTournaments = upcomingTournaments.filter((tournament) => {
    const typeMatch = filterType === 'all' || tournament.type.toLowerCase() === filterType
    const searchMatch = tournament.name.toLowerCase().includes(searchQuery.toLowerCase())
    return typeMatch && searchMatch
  })

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary py-8 text-primary-foreground">
        <div className="container mx-auto px-4">
          <h1 className="mb-2 text-3xl font-bold">Amateur Softball Tournaments</h1>
          <p className="text-lg">Find and register for upcoming softball tournaments near you.</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="co-ed">Co-ed</SelectItem>
                <SelectItem value="women's">Women's</SelectItem>
                <SelectItem value="men's">Men's</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="search"
              placeholder="Search tournaments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <Button variant="outline">
            <FilterIcon className="mr-2 h-4 w-4" /> More Filters
          </Button>
        </div>

        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Upcoming & Active Tournaments</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredUpcomingTournaments.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </div>
          {filteredUpcomingTournaments.length === 0 && (
            <p className="text-muted-foreground">No upcoming tournaments found.</p>
          )}
        </section>

        <section>
          <h2 className="mb-4 text-2xl font-bold">Past Tournaments</h2>
          <p className="mb-4">Browse through our extensive history of past tournaments.</p>
          <Link href="/tournaments/past">
            <Button>
              <ArchiveIcon className="mr-2 h-4 w-4" />
              View Past Tournaments
            </Button>
          </Link>
        </section>
      </main>
    </div>
  )
}

function TournamentCard({ tournament }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{tournament.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-2 text-muted-foreground">
          <CalendarIcon className="mr-2 inline-block h-4 w-4" />
          {new Date(tournament.date).toLocaleDateString()}
        </p>
        <p className="mb-2">{tournament.location}</p>
        <p className="mb-2">Type: {tournament.type}</p>
        <p>Teams: {tournament.teams}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Register Now</Button>
      </CardFooter>
    </Card>
  )
}
