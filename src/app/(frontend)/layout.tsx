import type { Metadata } from 'next'

import { GeistSans } from 'geist/font/sans'
import type { ReactNode } from 'react'

import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import './globals.css'
import { draftMode } from 'next/headers'
import { ThemeProvider } from 'next-themes'
import { baseUrl } from '@/utilities/baseUrl'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'
import { Sidebar } from '@/components/Sidebar'
import { Footer } from '@/components/Footer'

export const dynamic = 'force-static'

export default async function RootLayout({ children }: { children: ReactNode }) {
  const { isEnabled } = await draftMode()

  const payload = await getPayload({ config: payloadConfig })

  const { contact, social } = await payload.findGlobal({
    slug: 'company-info',
    depth: 1,
  })
  const { navItems } = await payload.findGlobal({
    slug: 'sidebar',
    depth: 1,
  })

  return (
    <html className={GeistSans.className} lang="en" suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
      </head>
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider forcedTheme="light">
          <Sidebar draft={isEnabled} contact={contact} social={social} navItems={navItems}>
            <div className="grow">{children}</div>
          </Sidebar>
          <Footer contact={contact} social={social} />
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@mikecebul',
  },
}
