import * as types from '../actions/types/variables'
import { DispatchType, GetUserDispatchType, CreateUserDispatchType } from '../actions/types/action.types'
import { AuthReducerType } from './types'

export default (
  state: AuthReducerType = {},
  action: DispatchType<GetUserDispatchType | CreateUserDispatchType>,
): AuthReducerType => {
  switch (action.type) {
    case types.CREATE_USER:
      return { ...state, ...action.payload }
    case types.SIGN_IN:
      return { ...state, ...action.payload, isSignedIn: true }
    case types.SIGN_OUT:
      return {}
    default:
      return state
  }
}
