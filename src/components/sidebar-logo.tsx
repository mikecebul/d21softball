'use client'

import * as React from 'react'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { SideBarLogo as Logo } from './Logo'
import { cn } from '@/utilities/cn'
import Link from 'next/link'

export function SideBarLogo() {
  const { isMobile, state } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <Link href="/" className="flex flex-col items-center justify-center">
            <div
              className={cn(
                'bg-brand aspect-square size-8 items-center justify-center rounded-lg text-white',
                state === 'expanded' ? 'hidden' : 'flex',
              )}
            >
              <span>D21</span>
            </div>
            <div className={state === 'collapsed' ? 'hidden' : 'block'}>
              <Logo />
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
