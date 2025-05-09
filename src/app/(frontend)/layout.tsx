import type { Metadata } from 'next'

import { GeistSans } from 'geist/font/sans'
import type { ReactNode } from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/globals/Footer/Component'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import './globals.css'
import { draftMode } from 'next/headers'
import { ThemeProvider } from 'next-themes'
import { baseUrl } from '@/utilities/baseUrl'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { Separator } from '@radix-ui/react-separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'
import { CompanyInfo, Header } from '@/payload-types'
import { Sidebar } from '@/components/Sidebar'

export const dynamic = 'force-static'

export default async function RootLayout({ children }: { children: ReactNode }) {
  const { isEnabled } = await draftMode()

  const payload = await getPayload({ config: payloadConfig })

  const { contact }: CompanyInfo = await payload.findGlobal({
    slug: 'company-info',
    depth: 1,
  })
  const { navItems }: Header = await payload.findGlobal({
    slug: 'header',
    depth: 1,
  })

  return (
    <html className={GeistSans.className} lang="en" suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
      </head>
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider forcedTheme="light">
          <Sidebar draft={isEnabled} contact={contact} navItems={navItems}>
            <div className="grow">{children}</div>
            <Footer />
          </Sidebar>
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
