import { cn } from '@/utilities/cn'
import { type ReactNode } from 'react'

export default function Container({
  className,
  children,
  prose,
}: {
  className?: string
  children: ReactNode
  prose?: boolean
}) {
  return (
    <section
      className={cn(
        'animate-fadeIn relative mx-auto max-w-full flex-1 flex-col overflow-clip px-4 md:px-8 2xl:container',
        className,
        {"2xl:max-w-prose max-w-prose": prose},
      )}
    >
      {children}
    </section>
  )
}
