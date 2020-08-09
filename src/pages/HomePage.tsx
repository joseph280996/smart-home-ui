import React from 'react'
import { Switch, Route, withRouter, RouteComponentProps, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Spinner } from 'react-bootstrap'
import Dashboard from './Dashboard'
import Authentication from './Authentication'
import { RootStore } from '../reducers'
import { getUser } from '../actions'
import { WebSocketProvider } from '../contexts/WebSocketContext'

const HomePage: React.FC<RouteComponentProps> = () => {
  const auth = useSelector((state: RootStore) => {
    return { user: state.auth }
  })
  const dispatch = useDispatch()
  React.useEffect(() => {
    getUser(dispatch)()
  }, [dispatch])
  if (!auth || !auth.user) return <Spinner animation="border" role="status" />

  return (
    <Switch>
      <Route
        path="/"
        exact
        render={() => {
          return auth.user && auth.user.isSignedIn ? (
            <WebSocketProvider>
              <Dashboard />
            </WebSocketProvider>
          ) : (
            <Redirect to="/auth" />
          )
        }}
      />
      <Route path="/auth" component={Authentication} />
    </Switch>
  )
}

export default withRouter(HomePage)
