import type { ReactNode } from 'react'

export const CardGrid = ({ children }: { children: ReactNode }) => {
  return <div className="mx-auto flex flex-wrap gap-8">{children}</div>
}
