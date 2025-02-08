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
import RichText from '@/components/RichText'
import { UpdateCardsType } from '@/payload-types'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/utilities/cn'

export const UpdateCardsBlock = ({ cards }: UpdateCardsType) => {
  return (
    <div className="flex flex-wrap justify-between gap-8">
      {cards &&
        cards.map(({ title, content, dateOrDescription, description, updatedAt }) => (
          <Card className="flex w-full max-w-2xl flex-col shadow-lg">
            <CardHeader className="">
              <CardTitle className="text-3xl">{title}</CardTitle>
              <CardDescriptionDiv>
                {dateOrDescription === 'description' && <p>{description}</p>}
                {dateOrDescription === 'date' && updatedAt && (
                  <div className="mt-1 flex items-center">
                    <CalendarIcon className="mr-1 h-4 w-4" />
                    {format(updatedAt, 'MMMM d, yyyy')}
                  </div>
                )}
              </CardDescriptionDiv>
            </CardHeader>
            <CardContent className="flex-1">
              <RichText content={content} className="" truncateLines />
            </CardContent>
            <CardFooter>
              <Link href="#" className={cn('w-full', buttonVariants({ variant: 'outline' }))}>
                Read Entire Update
              </Link>
            </CardFooter>
          </Card>
        ))}
    </div>
  )
}
