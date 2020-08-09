import React, { ReactElement } from 'react'
import { Alert, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import MiddleCard from '../../../components/MiddleCard'
import { signOut } from '../../../actions'

export default function SignOut(): ReactElement {
  const dispatch = useDispatch()
  React.useEffect(() => {
    signOut()(dispatch)
  }, [dispatch])
  return (
    <MiddleCard title="Signed Out" width={8}>
      <Alert variant="success">
        <Alert.Heading>Successfully Sign Out!</Alert.Heading>
        <div className="d-flex justify-content-end">
          <Button variant="outline-success">
            <Link to="/auth/signin">Continue</Link>
          </Button>
        </div>
      </Alert>
    </MiddleCard>
  )
}
