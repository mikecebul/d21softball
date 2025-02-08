import type { StaticImageData } from 'next/image'

import { cn } from 'src/utilities/cn'
import React from 'react'

import type { MediaBlock as MediaBlockType } from '@/payload-types'

import { Media } from '../../components/Media'

type Props = MediaBlockType & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  id?: string
  imgClassName?: string
  staticImage?: StaticImageData
}

export const MediaBlock: React.FC<Props> = (props) => {
  const { captionClassName, className, media, staticImage, showCaption } = props

  return (
    <div className={className}>
      <figure className="relative">
        <Media resource={media} src={staticImage} />
        {typeof media === 'object' && media?.caption && showCaption === true && (
          <figcaption className={cn('pt-6', captionClassName)}>
            <p>{media.caption}</p>
          </figcaption>
        )}
      </figure>
    </div>
  )
}
