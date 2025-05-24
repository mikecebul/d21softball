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
import { Separator } from './ui/separator'
import Image from 'next/image'
import { Icons } from './Icons'

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  contact?: CompanyInfo['contact']
  social?: CompanyInfo['social']
  navItems: SidebarType['navItems']
}

export function AppSidebar({ contact, social, navItems, ...props }: AppSidebarProps) {
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
        <Separator />
        <SidebarMenu>
          <SidebarMenuItem>
            <a href={`mailto:${contact?.email}`}>
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
                  {contact?.email}
                </span>
              </SidebarMenuButton>
            </a>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <a href={`tel:${contact?.phone?.replace(/\D/g, '')}`}>
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
                >
                  {contact?.phone}
                </span>
              </SidebarMenuButton>
            </a>
          </SidebarMenuItem>
          {social &&
            social.map((item) => (
              <SidebarMenuItem key={item.id}>
                <a href={item.link.url ?? ''} target="_blank">
                  <SidebarMenuButton
                    tooltip={item.link.label}
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Icon name={item.platform ?? 'Globe'} />
                    <span
                      className={cn('text-lg', {
                        hidden: state === 'collapsed',
                      })}
                    >
                      {item.link.label}
                    </span>
                  </SidebarMenuButton>
                </a>
              </SidebarMenuItem>
            ))}
          <SidebarMenuItem>
            <a
              href="https://usasoftballmi.org/"
              target="_blank"
              className={cn(
                'mx-auto block transition-all duration-300 ease-in-out',
                state === 'collapsed' ? 'size-0 opacity-0' : 'w-[150px] opacity-100',
              )}
            >
              <Image
                src="/footer-usa-softball-logo.png"
                alt="usa softball of michigan logo"
                height="250"
                width="250"
                className="mx-auto size-[150px]"
              />
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
