import { RichTextBlock as RichTextBlockType } from '@/payload-types'
import { RichText, type RichTextContent } from '@/components/RichText'
import { Card, CardContent } from '@/components/ui/card'

export const RichTextBlock = ({ richContent }: RichTextBlockType) => {
  return (
    <Card className="mx-auto max-w-2xl">
      <CardContent className="pt-6">
        <RichText data={richContent as RichTextContent} />
      </CardContent>
    </Card>
  )
}
