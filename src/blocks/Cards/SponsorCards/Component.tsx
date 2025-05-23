import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SponsorCardsType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Image from 'next/image'
import { CardGrid } from '@/components/Cards/CardGrid'

export const SponsorCardsBlock = async ({ sponsors }: SponsorCardsType) => {
  return (
    <CardGrid centered>
      {sponsors &&
        sponsors.map((card) => {
          if (typeof card === 'string') return null
          const { description, image, link, title } = card
          return (
            <CMSLink key={card.id} {...link} appearance="card">
              <Card className="group bg-accent/60 hover:bg-accent flex h-full w-full flex-col px-0 py-0 text-left shadow-sm @min-lg:max-w-xs">
                <CardContent className="bg-background flex h-60 flex-col items-center justify-center overflow-hidden rounded-t-lg p-0">
                  {typeof image === 'object' && (
                    <Image
                      src={image?.url ?? '/placeholder.svg'}
                      alt={image?.alt ?? ''}
                      width={800}
                      height={800}
                      className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                  )}
                </CardContent>
                <CardHeader>
                  <CardTitle className="pb-1 text-pretty capitalize">{title}</CardTitle>
                  {description ? (
                    <CardDescription className="">{description}</CardDescription>
                  ) : null}
                </CardHeader>
              </Card>
            </CMSLink>
          )
        })}
    </CardGrid>
  )
}
