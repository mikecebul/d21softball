import Container from '@/components/Container'
import type { TwoColumnLayoutBlock as TwoColumnLayoutBlockType } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { RenderBlocks } from '../RenderBlocks'

export const TwoColumnLayoutBlock = ({
  breakpoint = 'md',
  columnOne,
  columnTwo,
  nested,
}: TwoColumnLayoutBlockType) => {
  console.log(columnOne)
  const component = (
    <div className={cn('grid grid-cols-1 gap-12', `${breakpoint}:grid-cols-2`)}>
      <div className="flex flex-col gap-4">
        {columnOne && <RenderBlocks blocks={columnOne} nested={true} />}
      </div>
      <div className="flex flex-col gap-4">
        {columnTwo && <RenderBlocks blocks={columnTwo} nested={true} />}
      </div>
    </div>
  )
  return nested ? component : <Container>{component}</Container>
}
