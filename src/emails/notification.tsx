import { ContactFormValues } from '@/blocks/Form/ContactForm'
import { baseUrl as importedBaseUrl } from '@/utilities/baseUrl'
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

const baseUrl = importedBaseUrl ?? 'http://localhost:3000'

export const FormSubmissionEmail = ({ email, name }: ContactFormValues) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>New form submission: {name ?? 'undefined'}</Preview>
      <Container style={container}>
        <Section style={logoSection}>
          <Img
            src={`${baseUrl}/header-usa-softball-logo.png`}
            alt="usa softball of michigan logo"
            width={180}
            height={32}
            style={logo}
          />
          <p style={logoTitle}>District 21</p>
        </Section>

        <Section style={listSection}>
          <Text style={formTitle}>New Form Submission</Text>
          <Text style={listItem}>
            <strong>Name:</strong>
            {` ${name}`}
          </Text>
          <Text style={listItem}>
            <strong>Email:</strong>
            {` ${email}`}
          </Text>
          <Button href={`${baseUrl}/admin/collections/form-submissions`} style={button}>
            View Dashboard
          </Button>
        </Section>

        <Text style={footer}>D21 Softball. 101 M-66 N, Charlevoix, MI 49720</Text>
      </Container>
    </Body>
  </Html>
)

FormSubmissionEmail.PreviewProps = {
  email: 'dev@mikecebul.dev',
  name: 'Mike Cebulski',
} as ContactFormValues

export default FormSubmissionEmail

const main = {
  backgroundColor: '#ffffff',
  color: '#24292e',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
}

const container = {
  maxWidth: '480px',
  margin: '0 auto',
  padding: '20px 0 48px',
}

const logoSection = {
  paddingBottom: '24px',
}

const logo = {
  height: '32px',
}

const logoTitle = {
  color: 'hsl(222.2 47.4% 11.2%)',
  fontSize: '20px',
  fontWeight: 700,
  marginTop: '-12px',
  textWrap: 'balance' as const,
}

const formTitle = {
  margin: '0 0 12px 0',
  textAlign: 'left' as const,
  fontSize: '24px',
  lineHeight: 1.25,
  fontWeight: 700,
}

const listSection = {
  backgroundColor: 'hsl(215 20.2% 90%)',
  border: 'solid 1px #dedede',
  borderRadius: '5px',
  marginBottom: '24px',
  padding: '12px',
  textAlign: 'left' as const,
}

const listItem = {
  margin: '0',
  textAlign: 'left' as const,
}

const button = {
  fontSize: '12px',
  backgroundColor: 'hsl(219.2 60% 25.5%)',
  color: '#fff',
  lineHeight: 1.5,
  borderRadius: '5px',
  padding: '6px 12px',
  marginTop: '18px',
}

const footer = {
  color: '#6a737d',
  fontSize: '12px',
  textAlign: 'center' as const,
  marginTop: '60px',
}
