'use client'

import Container from '@/components/Container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FormConfigType } from '@/payload-types'
import { baseUrl } from '@/utilities/baseUrl'
import { type AnyFieldApi, formOptions, useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import RichText from '@/components/RichText'

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em className="text-destructive">
          {field.state.meta.errors.map((err, index) => (
            <span key={index} className="block first:mt-1">
              {err.message}
            </span>
          ))}
        </em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  )
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .min(2, { message: 'Must be 2 or more characters long' }),
  email: z.string().email(),
})

export type FormValues = z.infer<typeof formSchema>

const formOpts = formOptions({
  defaultValues: {
    name: '',
    email: '',
  },
})

export const RegisterForm = ({ form: formConfig }: FormConfigType) => {
  const { confirmationMessage, confirmationType, redirect } =
    typeof formConfig !== 'string' ? formConfig : {}
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      setError(undefined)
      try {
        const req = await fetch(`${baseUrl}/api/form-submissions`, {
          body: JSON.stringify({
            form: typeof formConfig === 'string' ? formConfig : formConfig.id,
            title: value.email,
            submissionData: value,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })

        const res = await req.json()

        if (req.status >= 400) {
          setError({
            message: res.errors?.[0]?.message || 'Internal Server Error',
            status: req.status.toString(),
          })
          return
        }

        setHasSubmitted(true)
        form.reset()

        if (confirmationType === 'redirect' && redirect?.url) {
          router.push(redirect.url)
        }
      } catch (error) {
        setError({
          message: 'Something went wrong.',
          status: '500',
        })
      }
    },
    validators: {
      onChange: formSchema,
    },
  })

  return (
    <Container>
      {error && (
        <div className="text-destructive mb-4">{`${error.status || '500'}: ${error.message || ''}`}</div>
      )}
      {!hasSubmitted || confirmationType !== 'message' ? (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <div className="pb-6">
            <h2 className="text-2xl font-semibold">New Form</h2>
          </div>
          <div className="space-y-3">
            <form.Field
              name="name"
              children={(field) => (
                <div>
                  <Label>Name</Label>
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="max-w-xs"
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            ></form.Field>
            <form.Field
              name="email"
              children={(field) => (
                <div>
                  <Label>Email</Label>
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="max-w-xs"
                  />
                  <FieldInfo field={field} />
                </div>
              )}
            ></form.Field>
            <div className="pt-6 pb-2">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button type="submit" disabled={!canSubmit}>
                    {isSubmitting ? '...' : 'Submit'}
                  </Button>
                )}
              />
            </div>
          </div>
        </form>
      ) : (
        confirmationMessage && <RichText content={confirmationMessage} />
      )}
    </Container>
  )
}
