'use client'

import type { CompanyInfo, Sidebar as SidebarType } from '@/payload-types'
import type { ReactNode } from 'react'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar'
import { AppSidebar } from '../app-sidebar'
import { Separator } from '@radix-ui/react-separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home } from 'lucide-react'
import React from 'react'
import { AdminBar } from '../AdminBar'

export const Sidebar = ({
  children,
  contact,
  social,
  draft,
  navItems,
}: {
  children: ReactNode
  contact: CompanyInfo['contact']
  social: CompanyInfo['social']
  draft: boolean
  navItems: SidebarType['navItems']
}) => {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter((segment) => segment !== '')

  return (
    <SidebarProvider>
      <AppSidebar contact={contact} social={social} navItems={navItems} />
      <SidebarInset>
        <AdminBar />
        <div className="animate-fadeIn max-w-full overflow-clip px-4 md:px-8 2xl:container">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/" className="flex items-center">
                        <Home className="h-4 w-4" />
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {pathSegments.map((segment, index) => (
                    <React.Fragment key={segment}>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        {index === pathSegments.length - 1 ? (
                          <BreadcrumbPage className="capitalize">{segment}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild className="capitalize">
                            <Link href={`/${pathSegments.slice(0, index + 1).join('/')}`}>
                              {segment}
                            </Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
        </div>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
