import { cn } from '@/utilities/cn'
import React from 'react'

import { serializeLexical } from './serialize'

type Props = {
  className?: string
  content: Record<string, any>
  enableGutter?: boolean
  enableProse?: boolean
  truncateLines?: boolean
}

const RichText: React.FC<Props> = ({
  className,
  content,
  enableGutter = false,
  enableProse = true,
  truncateLines = false,
}) => {
  if (!content) {
    return null
  }

  return (
    <div
      className={cn(
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
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
        serializeLexical({ nodes: content?.root?.children })}
    </div>
  )
}

export default RichText
