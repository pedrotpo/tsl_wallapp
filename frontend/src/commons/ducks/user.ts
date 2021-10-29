export const INITIAL_STATE = { loaded: false, data: null, error: null }

export const DUCK_NAME = 'user'

// Actions
export const LOAD_USER_PROFILE_STARTED = `${DUCK_NAME}/LOAD_USER_PROFILE_STARTED`
export const LOAD_USER_PROFILE_SUCCEEDED = `${DUCK_NAME}/LOAD_USER_PROFILE_SUCCEEDED`
export const LOAD_USER_PROFILE_FAILED = `${DUCK_NAME}/LOAD_USER_PROFILE_FAILED`
export const CLEAR_USER = `${DUCK_NAME}/CLEAR_USER`

// Action creators
export const loadUserProfileStarted = () => ({
  type: LOAD_USER_PROFILE_STARTED
})
export const loadUserProfileSucceeded = (data: any) => ({
  data,
  type: LOAD_USER_PROFILE_SUCCEEDED
})
export const loadUserProfileFailed = (error: any) => ({
  error,
  type: LOAD_USER_PROFILE_FAILED
})
export const clearUser = () => ({
  type: CLEAR_USER
})

// Reducer
export default (state = INITIAL_STATE, action: any) => {
  const data = {
    ...state.data,
    ...action.data
  }

  switch (action.type) {
    case LOAD_USER_PROFILE_STARTED:
      return {
        ...state
      }
    case LOAD_USER_PROFILE_SUCCEEDED:
      return {
        ...state,
        loaded: true,
        error: null,
        data
      }
    case LOAD_USER_PROFILE_FAILED:
      return {
        ...state,
        error: action.error
      }
    case CLEAR_USER:
      return {
        ...state,
        error: null,
        loaded: false,
        data: {}
      }
    default:
      return state
  }
}
