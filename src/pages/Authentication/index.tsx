import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import { RootStore } from '../../reducers'
import ForgotPass from './components/ForgotPass'
import SignOut from './components/SignOut'

const AuthPage: React.FC = () => {
  const auth = useSelector((state: RootStore) => {
    return { user: state.auth }
  })
  return (
    <Switch>
      <Route path="/auth/signout" exact component={SignOut} />
      {auth.user && auth.user.isSignedIn && <Redirect from="/auth" to="/" />}
      <Redirect from="/auth" exact to="/auth/signin" />
      <Route path="/auth/signup" component={SignUp} />
      <Route path="/auth/signin" component={SignIn} />
      <Route path="/auth/forgotpass" component={ForgotPass} />
    </Switch>
  )
}

export default AuthPage
