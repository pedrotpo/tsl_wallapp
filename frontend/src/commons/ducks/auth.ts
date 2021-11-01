import { AnyAction } from 'redux'
import { AuthUser } from 'commons/types'

export const INITIAL_STATE = { loading: false, data: {}, error: null }

export const DUCK_NAME = 'auth'

// Actions
export const LOGIN_USER_STARTED = `${DUCK_NAME}/LOGIN_USER_STARTED`
export const LOGIN_USER_SUCCEEDED = `${DUCK_NAME}/LOGIN_USER_SUCCEEDED`
export const LOGIN_USER_FAILED = `${DUCK_NAME}/LOGIN_USER_FAILED`
export const LOGOUT_USER = `${DUCK_NAME}/LOGOUT_USER`

// Action creators
export const logInUserStarted = () => ({
  type: LOGIN_USER_STARTED
})
export const logInUserSucceeded = (data: AuthUser) => ({
  data,
  type: LOGIN_USER_SUCCEEDED
})
export const logInUserFailed = (error: string) => ({
  error,
  type: LOGIN_USER_FAILED
})

export const logOutUser = () => ({
  type: LOGOUT_USER
})

// Reducer
export default (state = INITIAL_STATE, action: AnyAction) => {
  const data = {
    ...state.data,
    ...action.data
  }

  switch (action.type) {
    case LOGIN_USER_STARTED:
      return {
        ...state,
        loading: true
      }
    case LOGIN_USER_SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: null,
        data
      }
    case LOGIN_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case LOGOUT_USER:
      return {
        ...state,
        loading: false,
        error: null,
        data: {}
      }
    default:
      return state
  }
}
