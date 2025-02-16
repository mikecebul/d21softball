import type { MultiRowLayoutBlock as MultiRowLayoutBlockType } from '@/payload-types'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import Container from '@/components/Container'

export const MultiRowLayoutBlock = ({ blocks }: MultiRowLayoutBlockType) => {
  return (
    <Container className="space-y-12">
      <RenderBlocks blocks={blocks} nested />
    </Container>
  )
}
