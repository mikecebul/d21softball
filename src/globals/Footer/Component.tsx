import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

import { cn } from '@/utilities/cn'
import { buttonVariants } from '@/components/ui/button'
import { Clock, Facebook, Mail, Navigation, Phone, Printer } from 'lucide-react'
import Container from '@/components/Container'
import { CMSLink } from '@/components/Link'
import { getPayload } from 'payload'
import payloadConfig from '@payload-config'
//import { GoogleMap } from './GoogleMap'
import Image from 'next/image'
import { label } from '@/blocks/Form/blocks'

export async function Footer() {
  const payload = await getPayload({ config: payloadConfig })

  const { pageLinks, showContact, showDivisionLogo } = await payload.findGlobal({
    slug: 'footer',
    depth: 1,
  })

  const { contact, social, hours } = await payload.findGlobal({
    slug: 'company-info',
    depth: 1,
  })

  return (
    <footer>
      <Container className="py-0">
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* PageLinks */}
          {pageLinks && pageLinks.length > 0 && (
            <div className="col-span-1 flex flex-col">
              <p className="text-lg font-bold">Website</p>
              <Separator className="my-4" />
              <ul className="mb-8 flex flex-col space-y-4 font-medium text-gray-500">
                {pageLinks.map(({ link }, id) => {
                  return (
                    <li key={id}>
                      <CMSLink {...link} appearance="footerNav" />
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
          {/* Contact Info */}
          {showContact && contact && (
            <div className="col-span-1 flex flex-col">
              <p className="text-lg font-bold">Contact</p>
              <Separator className="my-4" />
              <ul className="mb-8 flex flex-col space-y-4 text-gray-500">
                {typeof contact.phone === 'string' && contact.phone.length > 0 && (
                  <li key={contact.phone} className="group">
                    <CMSLink
                      appearance='footerNav'
                      url={`tel:${contact.phone.replace(/\D/g, '')}`}
                      label={
                        <div className="inline-flex justify-start items-center">
                          <Phone className="mr-2 flex-shrink-0" size={20} />
                          {contact.phone}
                        </div>
                      }
                    />
                  </li>
                )}
                {typeof contact.email === 'string' && contact.email.length > 0 && (
                  <li key={contact.email} className="group">
                    <CMSLink
                      url={`mailto:${contact.email}`}
                      appearance="footerNav"
                      label={
                        <div className="inline-flex justify-start items-center">
                          <Mail className="mr-2 flex-shrink-0" size={20} />
                          {contact.email}
                        </div>
                      }
                    />
                  </li>
                )}
                {typeof contact.fax === 'string' && contact.fax.length > 0 && (
                  <li key={contact.fax} className="group">
                    <div className={cn(buttonVariants({ variant: 'footerNav' }),)}>
                      <Printer className="mr-2" size={20} />
                      {contact.fax}
                    </div>
                  </li>
                )}
                {(contact.physicalAddress?.street || contact.mailingAddress?.street) && (
                  <li
                  >
                    <CMSLink
                      appearance="footerNav"
                      url={contact.physicalAddress.googleMapLink ?? null}
                      newTab
                      label={
                        <div className='inline-flex justify-start items-center'>
                          <Navigation className="mr-2 flex-shrink-0" size={20} />
                          {contact.mailingAddress?.street ? (
                            // Show both addresses if mailing address exists
                            <ul>
                              <li>
                                <span>
                                  <strong>Physical: </strong>
                                  {`${contact.physicalAddress.street}, ${contact.physicalAddress.cityStateZip}`}
                                </span>
                              </li>
                              <li>
                                <span>
                                  <strong>Mailing: </strong>
                                  {`${contact.mailingAddress.street}, ${contact.mailingAddress.cityStateZip}`}
                                </span>
                              </li>
                            </ul>
                          ) : (
                            // Show simple address if only physical address exists
                            <span>
                              {`${contact.physicalAddress.street}, ${contact.physicalAddress.cityStateZip}`}
                            </span>
                          )}
                        </div>
                      }
                    />
                  </li>
                )}
                {/* Social Links */}
                {!!social &&
                  social?.map(({ link }) => (
                    <li key={link.label} className="group">
                      <CMSLink
                        {...link}
                        appearance="footerNav"
                        label={
                          <div className="inline-flex justify-start items-center">
                            <Facebook className="mr-2" size={20} />
                            {link.label}
                          </div>
                        }
                      />
                    </li>
                  ))}

                {/* Business Hours */}
                {!!hours && hours?.length > 0 && (
                  <li
                    className={cn(
                      buttonVariants({ variant: 'text' }),
                      'flex h-full items-start justify-start text-gray-500',
                    )}
                  >
                    <Clock className="mr-2" size={20} />
                    <ul>
                      {hours?.map(({ day, hours, id, note, type }) => (
                        <li key={id}>
                          {type === 'default' ? (
                            <span>
                              <strong>{`${day}: `}</strong>
                              {hours}
                            </span>
                          ) : (
                            <span>{note}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Division Logo Section */}
          {showDivisionLogo && (
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <p className="text-lg font-bold">Division</p>
              <Separator className="my-4" />
              {/** <GoogleMap contact={contact} /> **/}
              <Image
                src="/footer-usa-softball-logo.png"
                alt="usa softball of michigan logo"
                height="250"
                width="250"
                className="h-[250px] max-lg:mx-auto"
              />
            </div>
          )}
        </div>

        <Separator />
        <div className="flex items-center justify-center">
          <span className="block text-center text-sm text-gray-500">
            © {new Date().getFullYear()}{' '}
            <Link href="/" className={cn(buttonVariants({ variant: 'ghost' }), 'p-0')}>
              District 21 Softball
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </Container>
    </footer>
  )
}
