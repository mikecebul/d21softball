import { cn } from '@/utilities/cn'
import type { ReactNode } from 'react'

export const CardGrid = ({ centered, children }: { centered?: boolean; children: ReactNode }) => {
  return (
    <div className={cn('flex flex-wrap justify-start gap-8', { 'justify-center': centered })}>
      {children}
    </div>
  )
}
