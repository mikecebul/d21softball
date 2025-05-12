import type { ReactNode } from 'react'

export const CardGrid = ({ children }: { children: ReactNode }) => {
  return <div className="mx-auto flex flex-wrap justify-center gap-8">{children}</div>
}
