import React from 'react'
import { Switch, Route, withRouter, RouteComponentProps, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import Dashboard from './Dashboard'
import Authentication from './Authentication'
import { RootStore } from '../reducers'
import { getUser } from '../actions'

const HomePage: React.FC<RouteComponentProps> = () => {
  const auth = useSelector((state: RootStore) => {
    return { user: state.auth }
  })
  const dispatch = useDispatch()
  React.useEffect(() => {
    getUser(dispatch)()
  }, [dispatch])
  if (!auth) return <Spinner animation="border" role="status" />

  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => (auth.user && auth.user.isSignedIn ? <Dashboard /> : <Redirect to="/auth" />)}
      />
      <Route path="/auth" component={Authentication} />
    </Switch>
  )
}

export default withRouter(HomePage)
