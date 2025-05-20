import { Update } from '@/payload-types'
import Container from '../Container'
import { Description, Title } from '../Hero/HeroMedium'
import { Card, CardContent, CardFooter } from '../ui/card'
import { RichText } from '../RichText'
import { cn } from '@/utilities/cn'
import { buttonVariants } from '../ui/button'
import Link from 'next/link'
import { format } from 'date-fns'

export const UpdateBlock = ({ update }: { update: Update }) => {
  const { title, dateOrDescription, publishedAt, description, content } = update || {}
  const updateDescription =
    dateOrDescription === 'date'
      ? format(publishedAt!, 'MMMM d, yyyy')
      : dateOrDescription === 'description'
        ? description
        : false
  return (
    <Container className="prose pt-12 pb-24">
      <div className="flex flex-col gap-y-4">
        <Title text={title} heading="h1" />
        {!!updateDescription && <Description text={updateDescription} />}
      </div>
      <div className="pt-12">
        <CardContent className="grid px-0 pt-4 sm:gap-16">
          <RichText data={content} />
        </CardContent>
      </div>
      <CardFooter className="flex justify-between p-0">
        <Link
          href="/updates"
          className={cn('min-w-32', buttonVariants({ variant: 'brandSecondaryOutline' }))}
        >
          Back
        </Link>
      </CardFooter>
    </Container>
  )
}
