'use client'

import { useRowLabel } from '@payloadcms/ui'
import { useState, useEffect } from 'react'

const RowLabelForTeam = () => {
  const { data, rowNumber } = useRowLabel<{ team: string; isPaid: boolean }>()
  const [teamData, setTeamData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Reset state when team is removed
    if (!data?.team) {
      setTeamData({ title: 'Untitled' })
      setIsLoading(false)
      setError(null)
      return
    }

    const fetchTeam = async () => {
      try {
        setIsLoading(true)
        setError(null) // Reset error state
        const response = await fetch(`/api/teams/${data.team}`)

        if (!response.ok) {
          throw new Error('Failed to fetch team')
        }

        const json = await response.json()
        setTeamData(json)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load team')
        setTeamData({ title: 'Untitled', isPaid: false }) // Reset team data on error
      } finally {
        setIsLoading(false)
      }
    }

    fetchTeam()
  }, [data?.team])

  // if (!data?.team) return null // Don't render anything if no team
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div
      className={`font-bold capitalize dark:font-medium ${data?.isPaid ? 'text-green-500' : 'text-orange-500'
        }`}
    >
      {`${(rowNumber ?? 0) + 1} - ${teamData?.title || 'Untitled'}${data?.team ? (data.isPaid ? ' - Paid' : ' - Not Paid') : ''
        }`}
    </div>
  )
}

export default RowLabelForTeam
