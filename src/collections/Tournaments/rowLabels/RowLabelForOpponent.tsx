'use client'

import { usePayloadAPI, useRowLabel } from '@payloadcms/ui'
import { Trophy } from 'lucide-react'

const RowLabelForOpponent = () => {
  const { data, rowNumber } = useRowLabel<{
    team: { id: string; title: string }
    location: 'home' | 'visitor'
    score: number
    isWinner: boolean
  }>()

  const [{ data: teamData, isLoading }] = usePayloadAPI(
    `http://localhost:3000/api/teams/${data.team}`,
    {
      initialParams: {
        depth: 1,
      },
    },
  )

  if (!data?.team) return 'Select team...'
  if (isLoading) return <div>Loading...</div>

  return (
    <div className="flex items-center gap-2">
      <span className="font-medium">{teamData.title}</span>
      <span className="text-muted-foreground">({data.location})</span>
      {typeof data.score === 'number' && <span className="font-bold">{data.score}</span>}
      {data.isWinner && <Trophy className="h-4 w-4 text-yellow-500" />}
    </div>
  )
}

export default RowLabelForOpponent
