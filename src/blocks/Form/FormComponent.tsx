'use client'

import Container from '@/components/Container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { type AnyFieldApi, formOptions, useForm } from '@tanstack/react-form'
import { z } from 'zod'

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

const formOpts = formOptions({
  defaultValues: {
    name: '',
    email: '',
  },
})

export const RegisterForm = () => {
  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      console.log('Value:', value)
    },
    validators: {
      onChange: formSchema,
    },
  })

  return (
    <Container>
      <form
        className="pb-4"
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
              <>
                <Label>Name</Label>
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="max-w-xs"
                />
                <FieldInfo field={field} />
              </>
            )}
          ></form.Field>
          <form.Field
            name="email"
            children={(field) => (
              <>
                <Label>Email</Label>
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="max-w-xs"
                />
                <FieldInfo field={field} />
              </>
            )}
          ></form.Field>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" disabled={!canSubmit}>
                {isSubmitting ? '...' : 'Submit'}
              </Button>
            )}
          />
        </div>
      </form>
    </Container>
  )
}
