'use client'

import * as React from 'react'
import { Folder, Fuel, LoaderPinwheel, Medal, Scale, Trophy, Users } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar'
import { SideBarLogo } from './sidebar-logo'
import { cn } from '@/utilities/cn'
import { usePathname } from 'next/navigation'
import { isActiveRoute } from '@/utilities/isActiveRoute'
import Link from 'next/link'

// This is sample data.
const navItems = [
  {
    title: 'Tournaments',
    url: '/tournaments',
    icon: Trophy,
    isActive: true,
  },
  {
    title: 'Pitchers',
    url: '/pitcher-classification',
    icon: LoaderPinwheel,
  },
  {
    title: 'Archives',
    url: '/archives',
    icon: Folder,
  },
  {
    title: 'Hall of Fame',
    url: '/hall-of-fame',
    icon: Medal,
  },
  {
    title: 'Fuel/Motels',
    url: '/fuel-motels',
    icon: Fuel,
  },
  {
    title: 'Leagues',
    url: '/leagues',
    icon: Users,
  },
  {
    title: 'Umpires',
    url: '/umpires',
    icon: Scale,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const currentPathName = usePathname()
  const { state } = useSidebar()
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SideBarLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = isActiveRoute(currentPathName as string, item.url)
              return (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.url}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      size={'lg'}
                      isActive={isActive}
                      className={cn('cursor-pointer', { 'cursor-default': isActive })}
                    >
                      {item.icon && (
                        <item.icon
                          className={cn('', {
                            'text-brand stroke-2': isActive,
                          })}
                        />
                      )}
                      <span
                        className={cn('text-lg', {
                          'text-brand': isActive,
                          hidden: state === 'collapsed',
                        })}
                      >
                        {item.title}
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
