import { UIFieldServerComponent } from 'payload'
import React from 'react'
import { ContactFormValues } from '@/blocks/Form/ContactForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const FormData: UIFieldServerComponent = async ({ data, siblingData }) => {
  switch (siblingData.formType) {
    case 'contact':
      const { email, name } = data.submissionData as ContactFormValues
      return (
        <Card className="mt-5 lg:mt-8">
          <CardHeader>
            <CardTitle>Form Data</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <span className="font-semibold">Name</span>: {name}
            </p>
            <p>
              <span className="font-semibold">Email</span>: {email}
            </p>
          </CardContent>
        </Card>
      )

    default:
      break
  }
}

export default FormData
