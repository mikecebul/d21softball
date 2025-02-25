import Container from '@/components/Container'
import type { TwoColumnLayoutBlock as TwoColumnLayoutBlockType } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { RenderBlocks } from '@/blocks/RenderBlocks'

export const TwoColumnLayoutBlock = ({
  breakpoint = 'md',
  columns,
  direction = 'ltr',
  nested
}: TwoColumnLayoutBlockType) => {
  const [columnOne, columnTwo] = columns ?? []
  const component = (
    <div className={cn('grid grid-cols-1 gap-12', `${breakpoint}:grid-cols-2`)}>
      <div className={cn("flex flex-col gap-4", {
        'sm:order-2': direction === 'rtl' && breakpoint === 'sm',
        'md:order-2': direction === 'rtl' && breakpoint === 'md',
        'lg:order-2': direction === 'rtl' && breakpoint === 'lg',
        'xl:order-2': direction === 'rtl' && breakpoint === 'xl',
      })}>
        {columnOne && <RenderBlocks blocks={[columnOne]} nested={true} />}
      </div>
      <div className={cn("flex flex-col gap-4", {
        'sm:order-1': direction === 'rtl' && breakpoint === 'sm',
        'md:order-1': direction === 'rtl' && breakpoint === 'md',
        'lg:order-1': direction === 'rtl' && breakpoint === 'lg',
        'xl:order-1': direction === 'rtl' && breakpoint === 'xl',
      })}>
        {columnTwo && <RenderBlocks blocks={[columnTwo]} nested={true} />}
      </div>
    </div>
  )
  return nested ? component : <Container>{component}</Container>
}
