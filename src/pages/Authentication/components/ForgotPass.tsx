import React from 'react'
import { useFormik } from 'formik'
import { Form, Alert, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import MiddleCard from '../../../components/MiddleCard'
import FormGroup from '../../../components/FormGroup'
import { sendEmailReset } from '../../../actions'
import EmailSent from './EmailSent'

const ForgotPass: React.FC = () => {
  const [emailSent, setEmailSent] = React.useState<boolean>(false)
  const ForgotPassFormik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (formValues) => {
      await sendEmailReset(formValues.email)
      setEmailSent(true)
    },
  })
  if (emailSent) {
    return (
      <EmailSent
        header="Email Reset Password Sent"
        text="Please check your email for link to reset your password"
        buttonText="Go back to sign in"
      />
    )
  }
  return (
    <MiddleCard title="Sign In" width={4}>
      <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => ForgotPassFormik.handleSubmit(e)}>
        {ForgotPassFormik.status && <Alert variant="danger">{ForgotPassFormik.status}</Alert>}
        <FormGroup
          controlId="formEmail"
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          error={ForgotPassFormik.errors.email}
          value={ForgotPassFormik.values.email}
          onChange={ForgotPassFormik.handleChange}
          isValid={Boolean(ForgotPassFormik.errors.email && ForgotPassFormik.touched.email)}
        />
        <div className="my-3">
          Already got an account?
          <span className="ml-2">
            <Link to="signup" className="text-decoration-none">
              Sign In
            </Link>
          </span>
        </div>
        <div className="my-3">
          Don&apos;t have an account?
          <span className="ml-2">
            <Link to="signup" className="text-decoration-none">
              Sign Up
            </Link>
          </span>
        </div>
        <div className="mt-5 d-flex flex-row-reverse">
          <Button variant="primary" type="submit">
            Continue
          </Button>
        </div>
      </Form>
    </MiddleCard>
  )
}

export default ForgotPass
