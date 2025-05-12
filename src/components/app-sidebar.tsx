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
} from '@/components/ui/sidebar'
import { SideBarLogo } from './sidebar-logo'

// This is sample data.
const navItems = [
  {
    title: 'Tournaments',
    url: '#',
    icon: Trophy,
    isActive: true,
  },
  {
    title: 'Pitchers',
    url: '#',
    icon: LoaderPinwheel,
  },
  {
    title: 'Archives',
    url: '#',
    icon: Folder,
  },
  {
    title: 'Hall of Fame',
    url: '#',
    icon: Medal,
  },
  {
    title: 'Fuel/Motels',
    url: '#',
    icon: Fuel,
  },
  {
    title: 'Leagues',
    url: '#',
    icon: Users,
  },
  {
    title: 'Umpires',
    url: '#',
    icon: Scale,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SideBarLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
