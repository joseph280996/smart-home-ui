import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import { useFormik } from 'formik'
import { ListGroup, ListGroupItem, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { SignUpFormValues, SignUpFormError } from '../types/SignUp.types'
import { createUser } from '../../../actions'
import MiddleCard from '../../../components/MiddleCard'
import FormGroup from '../../../components/FormGroup'
import EmailSent from './EmailSent'

export default function SignUpPage(): ReactElement {
  const [emailSent, setEmailSent] = React.useState(false)
  const dispatch = useDispatch()
  const SignUpFormik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPass: '',
      zoneId: '',
      home: Array<string>(),
    },
    onSubmit: async (values: SignUpFormValues) => {
      try {
        const dispatchObject = await createUser(values)
        setEmailSent(true)
        dispatch(dispatchObject)
      } catch (err) {
        SignUpFormik.setStatus(err.message)
      }
    },
    validate: (values: SignUpFormValues) => {
      const errors: SignUpFormError = {}
      if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 letters'
      }
      if (values.password !== values.confirmPass) {
        errors.confirmPass = 'Password not match'
      }
      if (values.home.length === 0) {
        errors.zoneId = 'Please Add The Zone Provided By Us'
      }
      return errors
    },
  })
  if (emailSent) {
    return (
      <EmailSent
        header="We Have Sent You A Verification Email"
        text="Please check your inbox"
        buttonText="Go Back To Sign In"
      />
    )
  }
  return (
    <MiddleCard title="SignUp" width={4}>
      <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => SignUpFormik.handleSubmit(e)}>
        {SignUpFormik.status && <Alert variant="danger">{SignUpFormik.status}</Alert>}
        <FormGroup
          label="First Name"
          name="firstName"
          value={SignUpFormik.values.firstName}
          isValid={Boolean(SignUpFormik.errors.firstName && SignUpFormik.touched.firstName)}
          onChange={SignUpFormik.handleChange}
          placeholder="First Name"
          type="text"
          error={SignUpFormik.errors.firstName}
          controlId="formFirstName"
        />
        <FormGroup
          error={SignUpFormik.errors.lastName}
          name="lastName"
          isValid={Boolean(SignUpFormik.errors.lastName && SignUpFormik.touched.lastName)}
          onChange={SignUpFormik.handleChange}
          value={SignUpFormik.values.lastName}
          type="text"
          placeholder="Last Name"
          label="Last Name"
          controlId="formLastName"
        />
        <FormGroup
          name="email"
          isValid={Boolean(SignUpFormik.errors.email && SignUpFormik.touched.email)}
          onChange={SignUpFormik.handleChange}
          value={SignUpFormik.values.email}
          type="email"
          placeholder="Enter email"
          error={SignUpFormik.errors.email}
          label="Email address"
          controlId="formEmail"
        />

        <FormGroup
          error={SignUpFormik.errors.password}
          isValid={Boolean(SignUpFormik.errors.password && SignUpFormik.touched.password)}
          name="password"
          onChange={SignUpFormik.handleChange}
          value={SignUpFormik.values.password}
          type="password"
          placeholder="Password"
          label="Password"
          controlId="formPassword"
        />

        <FormGroup
          isValid={Boolean(SignUpFormik.errors.confirmPass && SignUpFormik.touched.confirmPass)}
          name="confirmPass"
          onChange={SignUpFormik.handleChange}
          value={SignUpFormik.values.confirmPass}
          type="password"
          error={SignUpFormik.errors.confirmPass}
          placeholder="Confirm Password"
          label="Confirm Password"
          controlId="formConfirmPassword"
        />

        <Form.Group controlId="zoneId">
          <Form.Label>Zone ID</Form.Label>
          <ListGroup>
            {SignUpFormik.values.home.map((zone) => {
              return <ListGroupItem key={zone}>{zone}</ListGroupItem>
            })}
          </ListGroup>
          <InputGroup>
            <Form.Control
              isValid={Boolean(SignUpFormik.errors.home)}
              name="zoneId"
              onChange={SignUpFormik.handleChange}
              value={SignUpFormik.values.zoneId}
              type="text"
              placeholder="Add Zone"
            />
            <InputGroup.Append>
              <Button
                className="d-flex justify-content-end"
                variant="primary"
                type="button"
                onClick={() => {
                  SignUpFormik.values.home.push(SignUpFormik.values.zoneId)
                  SignUpFormik.setFieldValue('zoneId', '')
                }}
              >
                Add
              </Button>
            </InputGroup.Append>
          </InputGroup>
          {Boolean(SignUpFormik.errors.zoneId) && (
            <Form.Text className="text-danger">{SignUpFormik.errors.zoneId}</Form.Text>
          )}
        </Form.Group>
        <div className="my-3">
          Already have an account?
          <span className="ml-2">
            <Link to="signin" className="text-decoration-none">
              Sign In
            </Link>
          </span>
        </div>
        <div className="my-3">
          Forgot password?
          <span className="ml-2">
            <Link to="forgotpass" className="text-decoration-none">
              Reset Password
            </Link>
          </span>
        </div>
        <div className="d-flex flex-row-reverse">
          <Button variant="primary" type="submit">
            Continue
          </Button>
        </div>
      </Form>
    </MiddleCard>
  )
}
