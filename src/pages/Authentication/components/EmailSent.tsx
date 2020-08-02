import React from 'react'
import { Alert, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MiddleCard from '../../../components/MiddleCard'
import { EmailSentProps } from '../types/EmailSent.types'

const EmailSent: React.FC<EmailSentProps> = (props: EmailSentProps) => {
  const { header, text, buttonText } = props
  return (
    <MiddleCard title="Email Sent" width={8}>
      <Alert variant="success">
        <Alert.Heading>{header}</Alert.Heading>
        <div>{text}</div>
        <hr />
        <div className="d-flex justify-content-end">
          <Button variant="outline-success">
            <Link to="signin">{buttonText}</Link>
          </Button>
        </div>
      </Alert>
    </MiddleCard>
  )
}

export default EmailSent
