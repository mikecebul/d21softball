'use client'

import * as React from 'react'
import { Mail, Phone, Trophy } from 'lucide-react'
import type { CompanyInfo, Sidebar as SidebarType } from '@/payload-types'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import { CMSLink } from '@/components/Link'
import { Icon } from './Icons/Icon'

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  contact?: CompanyInfo['contact']
  navItems: SidebarType['navItems']
}

export function AppSidebar({ contact, navItems, ...props }: AppSidebarProps) {
  const currentPathName = usePathname()
  const { state, isMobile, setOpenMobile } = useSidebar()

  const handleNavigation = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile(false)
    }
  }, [isMobile, setOpenMobile])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SideBarLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems?.map((item) => {
              const url =
                typeof item.link?.reference?.value === 'object'
                  ? item.link.reference?.relationTo === 'pages' &&
                    typeof (item.link.reference.value as any).slug === 'string'
                    ? `/${(item.link.reference.value as any).slug}`
                    : item.link.reference?.relationTo === 'media' &&
                        typeof (item.link.reference.value as any).url === 'string'
                      ? (item.link.reference.value as any).url
                      : ''
                  : item.link?.url || ''

              const isActive = isActiveRoute(currentPathName as string, url)
              return (
                <SidebarMenuItem key={item.id}>
                  <CMSLink {...item.link} appearance="sidebar" onClick={handleNavigation}>
                    <SidebarMenuButton
                      tooltip={item.link?.label}
                      size={'lg'}
                      isActive={isActive}
                      className={cn('cursor-pointer', { 'cursor-default': isActive })}
                    >
                      {item.link.icon && (
                        <Icon
                          name={item.link.icon}
                          size={20}
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
                        {item.link?.label}
                      </span>
                    </SidebarMenuButton>
                  </CMSLink>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <a href="mailto:scott@d21softball.org">
              <SidebarMenuButton
                tooltip="Email"
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Mail />
                <span
                  className={cn('text-lg', {
                    hidden: state === 'collapsed',
                  })}
                >
                  scott@d21softball.org
                </span>
              </SidebarMenuButton>
            </a>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <a href="tel:2315471144">
              <SidebarMenuButton
                tooltip="Phone"
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Phone />
                <span
                  className={cn('text-lg', {
                    hidden: state === 'collapsed',
                  })}
                >{`(231) 547-1144`}</span>
              </SidebarMenuButton>
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
