import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/utilities/cn'

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
      <p className="text-primary text-xl font-bold text-balance">District 21</p>
    </Link>
  )
}
export const SheetLogo = ({ name }: { name: string }) => {
  return (
    <Link href="/" className="mt-8 flex flex-col items-center">
      <Image
        src="/header-usa-softball-logo.png"
        alt="usa softball of michigan logo"
        width={180}
        height={32}
        className="h-[32px]"
      />
      <span className="text-primary text-center text-xl font-bold text-balance">District 21</span>
    </Link>
  )
}

export const SideBarLogo = () => {
  return (
    <div className="flex flex-col items-start">
      <Image
        src="/header-usa-softball-logo.png"
        alt="usa softball of michigan logo"
        width={180}
        height={32}
      />

      <span
        className={cn(
          'text-primary animate-fade-in-scale -mt-3 transform text-left text-base font-semibold text-balance',
        )}
      >
        District 21
      </span>
    </div>
  )
}
