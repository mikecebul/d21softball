import type { MultiRowLayoutBlock as MultiRowLayoutBlockType } from '@/payload-types'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import Container from '@/components/Container'
import { cn } from '@/utilities/cn'

export const MultiRowLayoutBlock = ({ blocks }: MultiRowLayoutBlockType) => {
  return (
    <Container className={cn('space-y-12')}>
      <RenderBlocks blocks={blocks} nested />
    </Container>
  )
}
