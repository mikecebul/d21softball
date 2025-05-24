import type { ReactNode } from 'react'

export const Main = ({ children }: { children: ReactNode }) => {
  return <main className="max-w-9xl @container">{children}</main>
}
