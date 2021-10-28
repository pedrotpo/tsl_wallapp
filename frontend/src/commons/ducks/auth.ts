export const INITIAL_STATE = { loading: false, data: {}, error: null }

export const DUCK_NAME = 'auth'

// Actions
export const LOG_IN_USER_STARTED = `${DUCK_NAME}/LOG_IN_USER_STARTED`
export const LOG_IN_USER_SUCCEEDED = `${DUCK_NAME}/LOG_IN_USER_SUCCEEDED`
export const LOG_IN_USER_FAILED = `${DUCK_NAME}/LOG_IN_USER_FAILED`

// Action creators
export const logInUserStarted = () => ({
  type: LOG_IN_USER_STARTED
})
export const logInUserSucceeded = (data: any) => ({
  data,
  type: LOG_IN_USER_SUCCEEDED
})
export const logInUserFailed = (error: any) => ({
  error,
  type: LOG_IN_USER_FAILED
})

// Reducer
export default (state = INITIAL_STATE, action: any) => {
  const data = {
    ...state.data,
    ...action.data
  }

  switch (action.type) {
    case LOG_IN_USER_STARTED:
      return {
        ...state,
        loading: true
      }
    case LOG_IN_USER_SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: null,
        data
      }
    case LOG_IN_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}
