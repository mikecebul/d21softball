import { cn } from '@/utilities/cn'

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
        'mx-auto flex max-w-prose flex-col justify-center gap-4 text-left text-pretty lg:text-center',
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
    <h3 className="text-brand max-w-prose text-base leading-7 font-semibold capitalize">{text}</h3>
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
          'max-w-4xl text-6xl font-bold tracking-tight text-balance md:text-7xl',
          className,
        )}
      >
        {text}
      </h1>
    )
  }
  if (heading === 'h2') {
    return (
      <h2 className={cn('max-w-prose text-5xl font-bold tracking-tight text-balance', className)}>
        {text}
      </h2>
    )
  }
  if (heading === 'h3') {
    return (
      <h3 className={cn('max-w-prose text-4xl font-bold tracking-tight text-balance', className)}>
        {text}
      </h3>
    )
  }
}
export const Description = ({ text, className }: { text: string; className?: string }) => {
  return (
    <p className={cn('text-muted-foreground max-w-prose text-lg leading-7 text-pretty', className)}>
      {text}
    </p>
  )
}
