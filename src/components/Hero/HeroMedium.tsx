import { cn } from '@/utilities/cn'
import RichText from '../RichText'

export function HeroMedium({
  title,
  description,
  className,
}: {
  title?: string
  description?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'mx-auto flex max-w-prose flex-col justify-center gap-4 text-pretty text-left lg:text-center',
        className,
      )}
    >
      <div>{!!title && <Title text={title} />}</div>
      {!!description && <Description text={description} />}
    </div>
  )
}

export const Subtitle = ({ text }: { text: string }) => {
  return (
    <h3 className="max-w-prose text-base font-semibold capitalize leading-7 text-brand">{text}</h3>
  )
}
export const Title = ({
  text,
  className,
  heading = 'h2',
}: {
  text: string
  className?: string
  heading?: 'h1' | 'h2' | 'h3'
}) => {
  if (heading === 'h1') {
    return (
      <h1
        className={cn(
          'max-w-prose text-balance text-6xl font-bold tracking-tight md:text-7xl',
          className,
        )}
      >
        {text}
      </h1>
    )
  }
  if (heading === 'h2') {
    return (
      <h2 className={cn('max-w-prose text-balance text-5xl font-bold tracking-tight', className)}>
        {text}
      </h2>
    )
  }
  if (heading === 'h3') {
    return (
      <h3 className={cn('max-w-prose text-balance text-4xl font-bold tracking-tight', className)}>
        {text}
      </h3>
    )
  }
}
export const Description = ({ text, className }: { text: string; className?: string }) => {
  return (
    <p className={cn('max-w-prose text-pretty text-lg leading-7 text-muted-foreground', className)}>
      {text}
    </p>
  )
}
