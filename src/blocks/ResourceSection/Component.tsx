import { CardGrid } from '@/components/Cards/CardGrid'
import { CMSLink } from '@/components/Link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ResourceSectionType } from '@/payload-types'
import Image from 'next/image'

export const ResourceSectionBlock = ({ resource }: ResourceSectionType) => {
  if (typeof resource === 'string') return null
  const { description, image, link, title, id } = resource
  return (
    <CMSLink key={id} {...link} appearance="card">
      <Card className="group bg-accent/60 hover:bg-accent flex h-full w-full flex-col px-0 py-0 text-left shadow-sm">
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
          <CardTitle className="pb-1 text-pretty capitalize">{title}</CardTitle>
          {description ? (
            <CardDescription className="text-lg">{description}</CardDescription>
          ) : null}
        </CardHeader>
      </Card>
    </CMSLink>
  )
}
