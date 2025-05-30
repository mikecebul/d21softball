'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'
import { LinkCardType } from './types'
import { CMSLink } from '../Link'
import { Resource } from '@/payload-types'

export const LinkCard = ({ card }: { card: LinkCardType | Resource }) => {
  return (
    <CMSLink {...card.link} appearance="card">
      <Card className="group flex h-full max-w-xs flex-col bg-accent/60 px-0 py-0 text-left shadow-sm hover:bg-accent">
        <CardContent className="overflow-hidden rounded-t-lg p-0">
          {typeof card.image === 'object' && (
            <Image
              src={card.image?.url ?? ''}
              alt={card.image?.alt ?? ''}
              width={800}
              height={800}
              className="max-h-60 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          )}
        </CardContent>
        <CardHeader>
          <CardTitle className="text-pretty pb-1 capitalize">{card.title}</CardTitle>
          <CardDescription className="">{card.description}</CardDescription>
        </CardHeader>
      </Card>
    </CMSLink>
  )
}
