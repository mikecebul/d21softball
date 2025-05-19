import { UpdateSectionType } from '@/payload-types'
import {RichText} from '@/components/RichText'
import {
  Card,
  CardContent,
  CardDescriptionDiv,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'
import { cn } from '@/utilities/cn'
import { buttonVariants } from '@/components/ui/button'

export const UpdateSectionBlock = ({ update }: UpdateSectionType) => {
  if (typeof update === 'string') return null

  const { description, content, title, updatedAt, slug, id } = update
  return (
    <Card className="flex w-full max-w-2xl flex-col shadow-lg" key={id}>
      <CardHeader className="">
        <CardTitle className="text-3xl">{title}</CardTitle>
        <CardDescriptionDiv>
          <p>{description}</p>
          <div className="mt-1 flex items-center">
            <CalendarIcon className="mr-1 h-4 w-4" />
            {format(updatedAt, 'MMMM d, yyyy')}
          </div>
        </CardDescriptionDiv>
      </CardHeader>
      <CardContent className="flex-1">
        <RichText data={content} className="" truncateLines />
      </CardContent>
      <CardFooter>
        <Link
          href={`/updates/${slug}`}
          className={cn('w-full', buttonVariants({ variant: 'brandSecondaryOutline' }))}
        >
          Read Entire Update
        </Link>
      </CardFooter>
    </Card>
  )
}
