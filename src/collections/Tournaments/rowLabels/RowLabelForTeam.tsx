'use client'

import { usePayloadAPI, useRowLabel } from '@payloadcms/ui'

const RowLabelForTeam = () => {
  const { data, rowNumber } = useRowLabel<{ team: string; isPaid: boolean | undefined }>()
  const [{ data: teamData, isLoading }] = usePayloadAPI(`http://localhost:3000/api/teams/${data.team}`, {
    initialParams: {
      depth: 1,
    }
  })

  if (isLoading) return <div>Loading...</div>

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
