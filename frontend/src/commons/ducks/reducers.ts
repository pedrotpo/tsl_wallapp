import { combineReducers } from 'redux'

// Reducers
import userReducer, { DUCK_NAME as USER_DUCK_NAME } from './user'
import postsReducer, { DUCK_NAME as POSTS_DUCK_NAME } from './posts'
import authReducer, { DUCK_NAME as AUTH_DUCK_NAME } from './auth'

const reducer = combineReducers({
  [USER_DUCK_NAME]: userReducer,
  [POSTS_DUCK_NAME]: postsReducer,
  [AUTH_DUCK_NAME]: authReducer
})

export default reducer
