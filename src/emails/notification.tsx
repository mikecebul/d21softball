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

interface FormSubmissionEmailProps {
  username?: string
  formData?: Record<string, any[]>
  title?: string
}

const baseUrl = importedBaseUrl ?? 'http://localhost:3000'

export const FormSubmissionEmail = ({
  username = 'Admin',
  formData,
  title,
}: FormSubmissionEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>New form submission: {title ?? "undefined"}</Preview>
      <Container style={container}>
        <div className="flex flex-col items-start">
          <Img
            src={`${baseUrl}/header-usa-softball-logo.png`}
            alt="usa softball of michigan logo"
            width={180}
            height={32}
            style={logo}
          />
          <p style={logoTitle}>District 21</p>
        </div>

        <Text style={formTitle}>New Form Submission: {title ?? "undefined"}</Text>

        <Section style={section}>
          <Text style={text}>
            Hey <strong>{username}</strong>!
          </Text>
          <Text style={text}>A new form submission has been received.</Text>

          {formData &&
            Object.entries(formData)
              .filter(([_, value]) => Array.isArray(value))
              .map(([fieldName, items]) => (
                <Section key={fieldName} style={listSection}>
                  <Text style={{ ...text, fontWeight: 'bold' }}>{fieldName.toUpperCase()}</Text>
                  {items.map((item, index) => (
                    <div key={index} style={{ marginTop: '12px' }}>
                      {Object.entries(item).map(([key, value]) => (
                        <Text key={key} style={list}>
                          <strong>
                            {key
                              .split(/(?=[A-Z])|_|\s/)
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
                              )
                              .join(' ')}
                          </strong>
                          : {String(value)}
                        </Text>
                      ))}
                    </div>
                  ))}
                </Section>
              ))}

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
  username: 'Scott',
  details: {
    email: 'test@mikecebul.dev',
    name: 'Mike Cebulski',
  },
} as FormSubmissionEmailProps

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
  fontSize: '24px',
  lineHeight: 1.25,
}

const section = {
  padding: '24px',
  border: 'solid 1px #dedede',
  borderRadius: '5px',
  textAlign: 'center' as const,
}

const text = {
  margin: '0 0 10px 0',
  textAlign: 'left' as const,
}

const listSection = {
  backgroundColor: 'hsl(215 20.2% 65.1%)',
  border: 'solid 1px #dedede',
  borderRadius: '5px',
  marginBottom: '24px',
  padding: '24px',
  textAlign: 'center' as const,
}

const list = {
  margin: '0',
  textAlign: 'left' as const,
}

const button = {
  fontSize: '14px',
  backgroundColor: 'hsl(219.2 60% 25.5%)',
  color: '#fff',
  lineHeight: 1.5,
  borderRadius: '0.5em',
  padding: '12px 24px',
}

const footer = {
  color: '#6a737d',
  fontSize: '12px',
  textAlign: 'center' as const,
  marginTop: '60px',
}
