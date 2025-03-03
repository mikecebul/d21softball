'use client'

import type { CompanyInfo, Header } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/Icons'
import { MainNav } from './MainNav'
import { MobileNav } from './MobileNav'
import { Logo } from '@/components/Logo'

export const HeaderClient = ({
  header,
  contact,
}: {
  header: Header
  contact: CompanyInfo['contact']
}) => {
  const navItems = header?.navItems || []
  const { phone, name: companyName } = contact || {}

  return (
    <header className="sticky top-0 z-40 flex w-full py-3 overflow-clip bg-background/50 backdrop-blur-xs">
      <div className="flex items-center w-full px-4 2xl:container md:px-8 2xl:px-0">
        <Logo name={companyName ?? 'District 21 Softball'} />
        <MainNav navItems={navItems} />
        <MobileNav navItems={navItems} companyName={companyName ?? 'District 21 Softball'} />
        <div className="flex flex-col items-center text-lg xl:flex-row 2xl:space-x-2">
          <div
            className={cn(
              buttonVariants({ variant: 'text' }),
              'hidden pr-0 text-lg text-brand-secondary xl:inline-flex',
            )}
          >
            <Icons.phone className="mr-2" size={20} />
            {phone}
          </div>
        </div>
      </div>
    </header>
  )
}
