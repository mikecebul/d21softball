import type { ReactNode } from 'react'

export const CardGrid = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-wrap gap-8 mx-auto max-w-7xl justify-center">
      {children}
    </div>
  )
}
