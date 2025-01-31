'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { LinkCardType } from './types'

export const VideoCard = ({ card }: { card: LinkCardType }) => {
  return (
    <a key={card.id} href={card.link.url ?? ''} target="_blank">
      <Card className="group flex h-full max-w-lg flex-col bg-accent/60 px-0 py-0 text-left shadow hover:bg-accent">
        <CardContent className="overflow-hidden rounded-t-md p-0">
          <iframe
            src={card.link.url ?? ''}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
            className="max-h-72 w-full rounded-t-lg object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </CardContent>
        <CardHeader>
          <CardTitle className="text-pretty pb-1 capitalize">{card.title}</CardTitle>
          <CardDescription className="">{card.description}</CardDescription>
        </CardHeader>
      </Card>
    </a>
  )
}
