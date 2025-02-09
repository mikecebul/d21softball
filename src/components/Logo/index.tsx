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
    <Link href="/" className="mt-8 flex flex-col items-center">
      <Image
        src="/header-usa-softball-logo.png"
        alt="usa softball of michigan logo"
        width={180}
        height={32}
        className="h-[32px]"
      />
      <span className="text-balance text-center text-xl font-bold text-primary">District 21</span>
    </Link>
  )
}
