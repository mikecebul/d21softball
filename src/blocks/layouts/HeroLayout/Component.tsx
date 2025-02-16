import type { HeroLayoutBlockType } from '@/payload-types'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import Container from '@/components/Container'

export const HeroLayoutBlock = ({ blocks }: HeroLayoutBlockType) => {
    return (
        <Container className="space-y-12">
            <RenderBlocks blocks={blocks} nested />
        </Container>
    )
}