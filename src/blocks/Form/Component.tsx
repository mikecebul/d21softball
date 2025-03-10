import { FormType } from '@/payload-types'
import { ContactForm } from './ContactForm'

export const FormComponent = ({ form: formConfig }: FormType) => {
  const { form } = typeof formConfig !== 'string' ? formConfig : {}

  switch (form) {
    case 'contact':
      return <ContactForm formConfig={formConfig} />

    default:
      break
  }
}
