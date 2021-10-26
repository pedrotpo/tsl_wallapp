// import api from '../api'

export const INITIAL_STATE = { loading: false, data: {}, error: null }

export const DUCK_NAME = 'user'

// Actions
export const LOAD_USER_PROFILE_STARTED = `${DUCK_NAME}/LOAD_USER_PROFILE_STARTED`
export const LOAD_USER_PROFILE_SUCCEED = `${DUCK_NAME}/LOAD_USER_PROFILE_SUCCEED`
export const LOAD_USER_PROFILE_FAILED = `${DUCK_NAME}/LOAD_USER_PROFILE_FAILED`

// Action creators
export const loadUserProfileStarted = () => ({
  type: LOAD_USER_PROFILE_STARTED
})
export const loadUserProfileSucceed = (data: any) => ({
  data,
  type: LOAD_USER_PROFILE_SUCCEED
})
export const loadUserProfileFailed = (error: any) => ({
  error,
  type: LOAD_USER_PROFILE_FAILED
})

// Reducer
export default (state = INITIAL_STATE, action: any) => {
  /* if (action.type === LOGOUT_SUCCEED) {
    return INITIAL_STATE
  } */

  const data = {
    ...state.data,
    ...action.data
  }

  switch (action.type) {
    case LOAD_USER_PROFILE_STARTED:
      return {
        ...state,
        loading: true
      }
    case LOAD_USER_PROFILE_SUCCEED:
      return {
        ...state,
        loading: false,
        error: null,
        data
      }
    case LOAD_USER_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}
