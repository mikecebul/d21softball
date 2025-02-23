import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SponsorCardsType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Image from 'next/image'
import { CardGrid } from '@/components/Cards/CardGrid'

export const SponsorCardsBlock = async ({ sponsors }: SponsorCardsType) => {

  return (
    <CardGrid>
      {sponsors && sponsors.map((card) => {
        if (typeof card === 'string') return null
        const { description, image, link, title } = card
        return (
          <CMSLink {...link} appearance="card">
            <Card className="group flex h-full max-w-xs flex-col bg-accent/60 px-0 py-0 text-left shadow hover:bg-accent">
              <CardContent className="overflow-hidden rounded-t-lg p-0">
                {typeof image === 'object' && (
                  <Image
                    src={image?.url ?? ''}
                    alt={image?.alt ?? ''}
                    width={800}
                    height={800}
                    className="max-h-60 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                )}
              </CardContent>
              <CardHeader>
                <CardTitle className="text-pretty pb-1 capitalize">{title}</CardTitle>
                {description ? <CardDescription className="">{description}</CardDescription> : null}
              </CardHeader>
            </Card>
          </CMSLink>
        )
      })}
    </CardGrid>
  )
}
