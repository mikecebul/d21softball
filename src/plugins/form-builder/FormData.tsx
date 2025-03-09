import { UIFieldServerComponent } from 'payload'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FormValues } from '@/blocks/Form/FormComponent'

const FormData: UIFieldServerComponent = async ({ data }) => {
  const { email, name } = data.submissionData as FormValues

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-3 text-2xl font-bold capitalize"></h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-gray-700 text-white">
            <CardHeader>
              <CardTitle>Form Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <p>
                <span className="font-semibold">Name</span>: {name}
              </p>
              <p>
                <span className="font-semibold">Email</span>: {email}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default FormData
