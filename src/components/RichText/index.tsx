import { cn } from '@/utilities/cn'
import React from 'react'

import { serializeLexical } from './serialize'

type Props = {
  className?: string
  content: Record<string, any>
  enableGutter?: boolean
  enableProse?: boolean
  truncateLines?: boolean
  variant?: 'description' | 'default'
}

const RichText: React.FC<Props> = ({
  className,
  content,
  enableProse = true,
  truncateLines = false,
  variant = 'default',
}) => {
  if (!content) {
    return null
  }

  return (
    <div
      className={cn(
        {
          'prose dark:prose-invert': enableProse,
          'line-clamp-10': truncateLines,
        },
        className,
      )}
    >
      {content &&
        !Array.isArray(content) &&
        typeof content === 'object' &&
        'root' in content &&
        serializeLexical({ nodes: content?.root?.children, variant })}
    </div>
  )
}

export default RichText
