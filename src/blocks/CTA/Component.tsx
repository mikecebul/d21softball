import { CTALinks } from '@/components/CTALinks'
import { Description, Title } from '@/components/Hero/HeroMedium'
import { Icon } from '@/components/Icons/Icon'
import RichText from '@/components/RichText'
import { Badge } from '@/components/ui/badge'
import { CTABlock as CTABlockType } from '@/payload-types'
import { cn } from '@/utilities/cn'

export const CTA = ({
  cta: { hasSubtitle, subtitle, title, description, links, heading },
}: CTABlockType) => {
  return (
    <div
      className={cn('flex flex-col justify-start gap-4')}
    >
      {hasSubtitle && (
        <Badge variant="brand" className="w-fit">
          <Icon name={subtitle?.icon ?? 'trophy'} className="mr-1 size-4" />
          {subtitle?.text}
        </Badge>
      )}
      {title && <Title text={title} heading={heading ?? 'h2'} />}
      {description && <Description text={description} />}
      {links && <CTALinks links={links} />}
    </div>
  )
}
