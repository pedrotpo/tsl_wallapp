import api from '../api'
import { AppDispatch } from './store'

export const INITIAL_STATE = { loading: false, data: {}, error: null }

export const DUCK_NAME = 'posts'

// Actions
export const LOAD_POSTS_STARTED = `${DUCK_NAME}/LOAD_POSTS_STARTED`
export const LOAD_POSTS_SUCCEED = `${DUCK_NAME}/LOAD_POSTS_SUCCEED`
export const LOAD_POSTS_FAILED = `${DUCK_NAME}/LOAD_POSTS_FAILED`

// Action creators
export const loadPostsStarted = () => ({
  type: LOAD_POSTS_STARTED
})
export const loadPostsSucceed = (data: any) => ({
  data,
  type: LOAD_POSTS_SUCCEED
})
export const loadPostsFailed = (error: any) => ({
  error,
  type: LOAD_POSTS_FAILED
})

export const loadPosts = () => async (dispatch: AppDispatch) => {
  dispatch(loadPostsStarted())
  try {
    const { data: posts } = await api.posts.getPosts()
    dispatch(loadPostsSucceed(posts))
    Promise.resolve(posts)
  } catch (error) {
    dispatch(loadPostsFailed(error))
    Promise.reject(error)
  }
}
// Reducer
export default (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case LOAD_POSTS_STARTED:
      return {
        ...state,
        loading: true
      }
    case LOAD_POSTS_SUCCEED:
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
    default:
      return state
  }
}
