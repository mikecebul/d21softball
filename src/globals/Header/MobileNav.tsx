'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Icons } from '../../components/Icons'
import { ScrollArea } from '@/components/ui/scroll-area'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/cn'
import { isActiveRoute } from '@/utilities/isActiveRoute'
import { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Logo, SheetLogo } from '@/components/Logo'

export type NavItem = NonNullable<Header['navItems']>[number]

export function MobileNav({ navItems, companyName }: { navItems: NavItem[]; companyName: string }) {
  const [open, setOpen] = useState(false)
  const currentPathName = usePathname()

  return (
    <div className="flex items-center lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size='clear'
            className="p-0 size-8 bg-secondary text-primary hover:bg-muted-foreground/20"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <Icons.closeMenu className="size-8" />
            ) : (
              <Icons.openMenu className="size-8" />
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="p-8 w-72 sm:w-1/2">
          <SheetHeader>
            <SheetTitle>
              {/* <span className="sr-only">{companyName}</span> */}
              <SheetLogo name={companyName} />
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-9rem)] py-10">
            <nav className="flex flex-col items-center space-y-4">
              {navItems.map(({ link }, i) => {
                const slug =
                  typeof link.reference?.value === 'object'
                    ? link.reference?.relationTo === 'pages' &&
                      typeof link.reference.value.slug === 'string'
                      ? link.reference.value.slug
                      : link.reference?.relationTo === 'media' &&
                        typeof link.reference.value.url === 'string'
                        ? link.reference.value.url
                        : ''
                    : ''
                return (
                  <CMSLink
                    key={i}
                    {...link}
                    appearance="nav"
                    className={cn('text-lg', {
                      'rounded-bl-lg rounded-br-lg border-b-2 border-b-brand border-opacity-100 text-brand':
                        isActiveRoute(currentPathName as string, slug),
                    })}
                    onClick={() => {
                      setOpen(false)
                    }}
                  />
                )
              })}
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}
