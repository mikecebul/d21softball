import { UIFieldServerComponent } from 'payload'
import React from 'react'
import { FormValues } from '@/blocks/Form/ContactForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

const FormData: UIFieldServerComponent = async ({ data }) => {
  const { email, name } = data.submissionData as FormValues

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
}

export default FormData
