import { Description, Title } from '@/components/Hero/HeroMedium'
import { TitleBlock as TitleBlockType } from '@/payload-types'
import { cn } from '@/utilities/cn'

export const TitleBlock = ({ title, description, alignment, heading }: TitleBlockType) => {
  return (
    <div
      className={cn('flex flex-col gap-y-4', {
        'items-left mx-auto w-fit text-left': alignment === 'center',
        'items-start text-left': alignment === 'left',
        'items-end text-left': alignment === 'right',
      })}
    >
      <Title
        text={title}
        heading={heading ?? 'h2'}
        className={cn('', { 'text-center': alignment === 'center' })}
      />
      {description && <Description text={description} />}
    </div>
  )
}
