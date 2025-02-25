'use client'

import { useRowLabel } from '@payloadcms/ui'

const RowLabelForTeam = () => {
  const { data, rowNumber } = useRowLabel<{ name: string; isPaid: boolean }>()
  return (
    <div
      className={`font-bold capitalize dark:font-medium ${
        data.isPaid ? 'text-green-500' : 'text-orange-500'
      }`}
    >{`${(rowNumber ?? 0) + 1} - ${data.name || 'Untitled'} ${data.isPaid ? '- Paid' : '- Not Paid'}`}</div>
  )
}

export default RowLabelForTeam
