import { FormType } from '@/payload-types'
import { ContactForm } from './ContactForm'
import Container from '@/components/Container'

export const FormComponent = ({ form: formConfig }: FormType) => {
  const { form } = typeof formConfig !== 'string' ? formConfig : {}

  switch (form) {
    case 'contact':
      return (
        <Container>
          <ContactForm formConfig={formConfig} />
        </Container>
      )
    default:
      break
  }
}
