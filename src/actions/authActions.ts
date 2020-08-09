import { Dispatch } from 'redux'
import api from './api'
import * as types from './types/variables'
import { SignUp, SignIn } from './types/request.type'
import { DispatchType, GetUserDispatchType, CreateUserDispatchType } from './types/action.types'
import FBAuth from './firebaseConfig'

export const createUser = async (formValues: SignUp): Promise<DispatchType<CreateUserDispatchType>> => {
  const { email, password } = formValues
  let newUser
  let response
  try {
    newUser = await FBAuth.createUserWithEmailAndPassword(email, password)
    await newUser.user?.sendEmailVerification()
  } catch (err) {
    throw new Error(err.message)
  }
  try {
    response = await api.post('/user', { firebaseUID: newUser?.user?.uid, ...formValues })
  } catch (err) {
    await FBAuth.currentUser?.delete()
    throw new Error(err.message)
  }
  return { type: types.CREATE_USER, payload: response.data }
}

export const getUser = (dispatch: Dispatch<DispatchType<GetUserDispatchType>>) => {
  const FBUUID = sessionStorage.getItem('uuid')
  return async (): Promise<void> => {
    try {
      if (FBUUID) {
        const response = await api.get(`/user/${FBUUID}`)
        dispatch({
          type: types.SIGN_IN,
          payload: response.data,
        })
      }
    } catch (err) {
      console.error(err)
      throw new Error(err.message)
    }
  }
}

export const signIn = async (formValues: SignIn): Promise<DispatchType<GetUserDispatchType>> => {
  try {
    const FBUser = await FBAuth.signInWithEmailAndPassword(formValues.email, formValues.password)
    const response = await api.get(`/user/${FBUser.user?.uid}`)
    const uuid = FBUser.user ? FBUser.user.uid : ''
    sessionStorage.setItem('uuid', uuid)
    return { type: types.SIGN_IN, payload: response.data }
  } catch (err) {
    throw new Error(err.message)
  }
}

export const sendEmailReset = async (email: string): Promise<void> => {
  try {
    await FBAuth.sendPasswordResetEmail(email)
  } catch (err) {
    throw new Error(err.message)
  }
}

export const signOut = () => async (dispatch: Dispatch): Promise<void> => {
  try {
    sessionStorage.removeItem('uuid')
    await FBAuth.signOut()
    dispatch({
      type: types.SIGN_OUT,
      payload: null,
    })
  } catch (err) {
    throw new Error(err.message)
  }
}
