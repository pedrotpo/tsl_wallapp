export const INITIAL_STATE = { loading: false, data: {}, error: null }

export const DUCK_NAME = 'posts'

// Actions
export const LOAD_POSTS_STARTED = `${DUCK_NAME}/LOAD_POSTS_STARTED`
export const LOAD_POSTS_SUCCEEDED = `${DUCK_NAME}/LOAD_POSTS_SUCCEEDED`
export const LOAD_POSTS_FAILED = `${DUCK_NAME}/LOAD_POSTS_FAILED`

export const CREATE_POSTS_STARTED = `${DUCK_NAME}/CREATE_POSTS_STARTED`
export const CREATE_POSTS_SUCCEEDED = `${DUCK_NAME}/CREATE_POSTS_SUCCEEDED`
export const CREATE_POSTS_FAILED = `${DUCK_NAME}/CREATE_POSTS_FAILED`

// Action creators
export const loadPostsStarted = () => ({
  type: LOAD_POSTS_STARTED
})
export const loadPostsSucceeded = (data: any) => ({
  data,
  type: LOAD_POSTS_SUCCEEDED
})
export const loadPostsFailed = (error: any) => ({
  error,
  type: LOAD_POSTS_FAILED
})

export const createPostsStarted = (data: any) => ({
  data,
  type: CREATE_POSTS_STARTED
})
export const createPostsSucceeded = () => ({
  type: CREATE_POSTS_SUCCEEDED
})
export const createPostsFailed = (error: any) => ({
  error,
  type: CREATE_POSTS_FAILED
})

// Reducer
export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LOAD_POSTS_STARTED:
      return {
        ...state,
        loading: true
      }
    case LOAD_POSTS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: null,
        data: action.data
      }
    case LOAD_POSTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    case CREATE_POSTS_STARTED:
      return {
        ...state,
        loading: true,
        data: action.data
      }
    case CREATE_POSTS_SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: null,
        data: null
      }
    case CREATE_POSTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error
      }
    default:
      return state
  }
}
