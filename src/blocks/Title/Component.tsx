import Container from '@/components/Container'
import { Description, Title } from '@/components/Hero/HeroMedium'
import { TitleBlock as TitleBlockType } from '@/payload-types'

export const TitleBlock = ({ title, description }: TitleBlockType) => {
  return (
    <div className="flex flex-col gap-y-4">
      <Title text={title} />
      {description && <Description text={description} />}
    </div>
  )
}
