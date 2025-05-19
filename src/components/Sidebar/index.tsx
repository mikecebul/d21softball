'use client'

import type { CompanyInfo, Sidebar as SidebarType } from '@/payload-types'
import type { ReactNode } from 'react'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '../ui/sidebar'
import { AppSidebar } from '../app-sidebar'
import { AdminBar } from '../AdminBar'
import { Separator } from '@radix-ui/react-separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'

export const Sidebar = ({
  children,
  contact,
  draft,
  navItems,
}: {
  children: ReactNode
  contact: CompanyInfo['contact']
  draft: boolean
  navItems: SidebarType['navItems']
}) => {
  return (
    <SidebarProvider>
      <AppSidebar contact={contact} navItems={navItems} />
      <SidebarInset>
        <AdminBar
          adminBarProps={{
            preview: draft,
          }}
        />
        <div className="animate-fadeIn max-w-full overflow-clip px-4 md:px-8 2xl:container">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
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
