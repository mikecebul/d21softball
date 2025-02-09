import { cn } from '@/utilities/cn'
import { baseball } from '@lucide/lab'
import { Icon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const Logo = ({ name }: { name: string }) => {
  return (
    <Link href="/" className="flex flex-col items-start">
      <Image
        src="/header-usa-softball-logo.png"
        alt="usa softball of michigan logo"
        width={180}
        height={32}
        className="h-[32px]"
      />
      <p className="text-balance text-xl font-bold text-primary">District 21</p>
    </Link>
  )
}
export const SheetLogo = ({ name }: { name: string }) => {
  return (
    <Link href="/" className="mt-8 flex flex-col items-center justify-center gap-2">
      <Image
        src="/header-usa-softball-logo.png"
        alt="usa softball of michigan logo"
        width={360}
        height={65}
        className="h-[65px]"
      />
      <div className="flex flex-col gap-2">
        <Icon iconNode={baseball} className="h-8 w-8 shrink-0 text-primary" />
        <span className="text-balance text-center text-xl font-bold text-primary">{name}</span>
      </div>
    </Link>
  )
}
