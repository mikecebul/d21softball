import { CardGrid } from '@/components/Cards/CardGrid'
import { LinkCard } from '@/components/Cards/LinkCard'
import { VideoCard } from '@/components/Cards/VideoCard'
import Container from '@/components/Container'
import { MotionStaggeredChild } from '@/components/framer/MotionStaggeredChild'
import { MotionStaggerChildren } from '@/components/framer/MotionStaggeredChildren'
import { GridSVG } from '@/components/GridSVG'
import { HeroMedium } from '@/components/Hero/HeroMedium'
import type { LinksBlock as LinksBlockType } from '@/payload-types'

export const LinksBlock = ({ title, description, cards }: LinksBlockType) => {
  return (
    <Container>
      <GridSVG />
      <HeroMedium title={title || undefined} description={description || undefined} />
      {!!cards && cards.length > 0 && (
        <MotionStaggerChildren>
          <CardGrid>
            {cards.map((card) => (
              <MotionStaggeredChild key={card.id}>
                <LinkCard card={card} />
              </MotionStaggeredChild>
            ))}
          </CardGrid>
        </MotionStaggerChildren>
      )}
    </Container>
  )
}
