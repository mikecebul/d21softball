import { UpdatesBlock as UpdatesBlockType } from '@/payload-types'
import Container from '@/components/Container'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarIcon } from 'lucide-react'
import RichText from '@/components/RichText'
import { format } from 'date-fns'
import React from 'react'
import { Title } from '@/components/Hero/HeroMedium'
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from '@/components/ui/table'

const standings = [
  { rank: 1, name: 'Team 1 long name that is long', wins: 10, losses: 2 },
  { rank: 2, name: 'Team 2', wins: 8, losses: 4 },
  { rank: 3, name: 'Team 3', wins: 6, losses: 6 },
]
export function UpdatesBlock({
  commissionerUpdateTitle,
  commissionerUpdateContent,
  commissionerUpdateName,
  commissionerUpdateUpdatedAt,
  standingsTitle,
  standings,
}: UpdatesBlockType) {
  return (
    <Container>
      <Title text="Updates" className="mb-12 text-left" />
      <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <Card className="w-full shadow-lg">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="mt-1 flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="mr-1 h-4 w-4" />
                {format(commissionerUpdateUpdatedAt, 'MMMM d, yyyy')}
              </div>
            </CardHeader>
            <CardContent>
              <RichText content={commissionerUpdateContent} />
              <div className="mt-4 text-right font-semibold">
                <p>- {commissionerUpdateName}, District Commissioner</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-5">
          <Card className="w-full max-w-3xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold">{standingsTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[15%] text-center">Rank</TableHead>
                    <TableHead className="w-[55%]">Team</TableHead>
                    <TableHead className="w-[15%] text-center">W</TableHead>
                    <TableHead className="w-[15%] text-center">L</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {standings.map((team) => (
                    <TableRow key={team.teamName}>
                      <TableCell className="text-center">{team.rank}</TableCell>
                      <TableCell>{team.teamName}</TableCell>
                      <TableCell className="text-center">{team.wins}</TableCell>
                      <TableCell className="text-center">{team.losses}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  )
}
