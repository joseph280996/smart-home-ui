import React from 'react'
import { useDispatch } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useFormik } from 'formik'
import { useHistory, Link } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import { SignInFormValues } from '../types/SignIn.types'
import MiddleCard from '../../../components/MiddleCard'
import FormGroup from '../../../components/FormGroup'
import { signIn } from '../../../actions'

const SignInPage: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const SignInFormik = useFormik({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPass: '',
      zoneId: '',
      home: Array<string>(),
    },
    onSubmit: async (values: SignInFormValues) => {
      try {
        const userDispatchObj = await signIn(values)
        dispatch(userDispatchObj)
        history.replace({ pathname: '/' })
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
        SignInFormik.setStatus(err.message)
      }
    },
  })
  return (
    <MiddleCard title="Sign In" width={4}>
      <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => SignInFormik.handleSubmit(e)}>
        {SignInFormik.status && <Alert variant="danger">{SignInFormik.status}</Alert>}
        <FormGroup
          controlId="formEmail"
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          error={SignInFormik.errors.email}
          value={SignInFormik.values.email}
          onChange={SignInFormik.handleChange}
          isValid={Boolean(SignInFormik.errors.email && SignInFormik.touched.email)}
        />

        <FormGroup
          name="password"
          type="password"
          value={SignInFormik.values.password}
          placeholder="Password"
          onChange={SignInFormik.handleChange}
          error={SignInFormik.errors.password}
          isValid={Boolean(SignInFormik.errors.password && SignInFormik.touched.password)}
          label="Password"
          controlId="formPassword"
        />
        <div className="my-3">
          Don&apos;t have an account?
          <span className="ml-2">
            <Link to="signup" className="text-decoration-none">
              Sign Up
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
        <div className="mt-5 d-flex flex-row-reverse">
          <Button variant="primary" type="submit">
            Sign In
          </Button>
        </div>
      </Form>
    </MiddleCard>
  )
}

export default SignInPage
