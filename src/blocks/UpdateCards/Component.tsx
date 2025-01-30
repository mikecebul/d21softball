import { Card, CardContent, CardDescriptionDiv, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import RichText from '@/components/RichText'
import { UpdateCardsType } from '@/payload-types'

export const UpdateCardsBlock = ({ cards }: UpdateCardsType) => {
  return (
    <div className="flex flex-wrap gap-8">
      {cards &&
        cards.map(({ title, content, dateOrDescription, description, updatedAt }) => (
          <Card className="w-full max-w-2xl shadow-lg">
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
            <CardContent>
              <RichText content={content} />
            </CardContent>
          </Card>
        ))}
    </div>
  )
}
