import Container from '@/components/Container'
import type { TwoColumnLayoutBlock as TwoColumnLayoutBlockType } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { RenderBlocks } from '@/blocks/RenderBlocks'

export const TwoColumnLayoutBlock = ({
  breakpoint = 'md',
  columns,
  direction = 'ltr',
  nested,
}: TwoColumnLayoutBlockType) => {
  const [columnOne, columnTwo] = columns ?? []
  const component = (
    <div className={cn('grid grid-cols-1 gap-12 @4xl:grid-cols-2')}>
      <div
        className={cn('flex flex-col gap-4', {
          '@min-4xl:order-2': direction === 'rtl',
        })}
      >
        {columnOne && <RenderBlocks blocks={[columnOne]} nested={true} />}
      </div>
      <div
        className={cn('flex flex-col gap-4', {
          '@min-4xl:order-1': direction === 'rtl',
        })}
      >
        {columnTwo && <RenderBlocks blocks={[columnTwo]} nested={true} />}
      </div>
    </div>
  )
  return nested ? component : <Container>{component}</Container>
}
