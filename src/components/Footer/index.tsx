import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

import { cn } from '@/utilities/cn'
import { buttonVariants } from '@/components/ui/button'
import { Clock, Facebook, Mail, Navigation, Phone, Printer } from 'lucide-react'
import Container from '@/components/Container'
import { CompanyInfo } from '@/payload-types'
import { Icon } from '../Icons/Icon'

export function Footer({
  contact,
  social,
}: {
  contact: CompanyInfo['contact']
  social: CompanyInfo['social']
}) {
  return (
    <footer>
      <Container className="relative py-0">
        <Separator />
        <div className="flex items-center justify-center">
          <span className="block text-center text-sm text-gray-500">
            © {new Date().getFullYear()}{' '}
            <Link href="/" className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'p-0')}>
              {contact?.name}
            </Link>
            . All Rights Reserved.
          </span>
        </div>
        {social &&
          social.length > 0 &&
          social.map((item) => (
            <Link
              href={item.link.url ?? ''}
              className="absolute top-1/2 right-8 -translate-y-1/2"
              target="_blank"
              rel="noopener noreferrer"
              key={item.id}
            >
              <Icon
                name={item.platform ?? 'Facebook'}
                className="h-5 w-5 text-gray-500 hover:text-gray-700"
              />
            </Link>
          ))}
      </Container>
    </footer>
  )
}
