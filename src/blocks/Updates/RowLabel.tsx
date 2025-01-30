'use client'

import { useRowLabel } from '@payloadcms/ui'

const RowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ teamName: string }>()
  return (
    <div className="font-bold capitalize dark:font-medium dark:text-orange-400">{`${(rowNumber ?? 0) + 1} - ${data.teamName || 'Untitled'}`}</div>
  )
}

export default RowLabel
